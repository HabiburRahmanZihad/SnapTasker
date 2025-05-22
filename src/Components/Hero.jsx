const Hero = () => {
    return (
        <div className="w-full">
            <div className="carousel w-full h-[60vh] sm:h-[70vh] ">

                <div id="slide1" className="carousel-item relative w-full">
                    <img
                        src="/assets/slide1.png"
                        className="w-full h-full "
                        alt="Slide 1"
                    />
                    <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle bg-white bg-opacity-60 hover:bg-opacity-80">❮</a>
                        <a href="#slide2" className="btn btn-circle bg-white bg-opacity-60 hover:bg-opacity-80">❯</a>
                    </div>
                </div>

                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="/assets/slide2.png"
                        className="w-full h-full "
                        alt="Slide 2"
                    />
                    <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle bg-white bg-opacity-60 hover:bg-opacity-80">❮</a>
                        <a href="#slide3" className="btn btn-circle bg-white bg-opacity-60 hover:bg-opacity-80">❯</a>
                    </div>
                </div>

                <div id="slide3" className="carousel-item relative w-full">
                    <img
                        src="/assets/slide3.png"
                        className="w-full h-full "
                        alt="Slide 3"
                    />
                    <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle bg-white bg-opacity-60 hover:bg-opacity-80">❮</a>
                        <a href="#slide1" className="btn btn-circle bg-white bg-opacity-60 hover:bg-opacity-80">❯</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Hero;
