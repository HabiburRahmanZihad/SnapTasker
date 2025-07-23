const Hero = () => {
    return (
        <div className="w-full">
            <div className="carousel w-full h-[60vh] lg:h-[70vh] rounded-box overflow-hidden">

                {/* Slide 1 */}
                <div id="slide1" className="carousel-item relative w-full">
                    <img
                        src="/assets/slide1.png"
                        className="w-full h-full object-cover"
                        alt="Slide 1"
                    />
                    <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a
                            href="#slide3"
                            className="btn btn-circle bg-base-100 bg-opacity-60 text-primary border-none hover:bg-opacity-80"
                        >
                            ❮
                        </a>
                        <a
                            href="#slide2"
                            className="btn btn-circle bg-base-100 bg-opacity-60 text-primary border-none hover:bg-opacity-80"
                        >
                            ❯
                        </a>
                    </div>
                </div>

                {/* Slide 2 */}
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="/assets/slide2.png"
                        className="w-full h-full object-cover"
                        alt="Slide 2"
                    />
                    <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a
                            href="#slide1"
                            className="btn btn-circle bg-base-100 bg-opacity-60 text-primary border-none hover:bg-opacity-80"
                        >
                            ❮
                        </a>
                        <a
                            href="#slide3"
                            className="btn btn-circle bg-base-100 bg-opacity-60 text-primary border-none hover:bg-opacity-80"
                        >
                            ❯
                        </a>
                    </div>
                </div>

                {/* Slide 3 */}
                <div id="slide3" className="carousel-item relative w-full">
                    <img
                        src="/assets/slide3.png"
                        className="w-full h-full object-cover"
                        alt="Slide 3"
                    />
                    <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a
                            href="#slide2"
                            className="btn btn-circle bg-base-100 bg-opacity-60 text-primary border-none hover:bg-opacity-80"
                        >
                            ❮
                        </a>
                        <a
                            href="#slide1"
                            className="btn btn-circle bg-base-100 bg-opacity-60 text-primary border-none hover:bg-opacity-80"
                        >
                            ❯
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );

};

export default Hero;