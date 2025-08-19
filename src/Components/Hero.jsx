import { useEffect, useState } from "react";

// Array of slides with image source and alt text
const slides = [
    { id: 1, src: "/assets/slide1.png", alt: "Slide 1" },
    { id: 2, src: "/assets/slide2.png", alt: "Slide 2" },
    { id: 3, src: "/assets/slide3.png", alt: "Slide 3" },
];

const Hero = () => {
    // State to track the current active slide (index)
    const [current, setCurrent] = useState(0);

    // Auto-slide effect: change slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length); // Loop back to first slide
        }, 5000);

        // Cleanup interval when component unmounts
        return () => clearInterval(interval);
    }, []);

    // Navigate to the previous slide
    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Navigate to the next slide
    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    return (
        <div className="relative w-full h-[60vh] lg:h-[70vh] rounded-box overflow-hidden">
            {/* Slides container */}
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }} // Slide effect
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="w-full flex-shrink-0 h-full">
                        {/* Slide image */}
                        <img
                            src={slide.src}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation arrows */}
            <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 transform justify-between">
                <button
                    onClick={prevSlide} // Go to previous slide
                    className="btn btn-circle bg-base-100 bg-opacity-60 text-primary border-none hover:bg-opacity-80"
                >
                    ❮
                </button>
                <button
                    onClick={nextSlide} // Go to next slide
                    className="btn btn-circle bg-base-100 bg-opacity-60 text-primary border-none hover:bg-opacity-80"
                >
                    ❯
                </button>
            </div>

            {/* Dot indicators for slides */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)} // Jump to specific slide
                        className={`w-3 h-3 rounded-full ${current === i ? "bg-primary" : "bg-base-100"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;