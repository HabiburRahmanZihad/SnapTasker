const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-full bg-base-100 space-y-8">
            {/* Animated Brand Rings */}
            <div className="relative flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <div className="absolute w-16 h-16 rounded-full border-4 border-secondary border-b-transparent animate-spin-slow"></div>
                <div className="absolute w-10 h-10 rounded-full border-4 border-accent border-l-transparent animate-spin-reverse"></div>
            </div>

            {/* Dots Bounce Loader */}
            <div className="flex space-x-2">
                <span className="w-3 h-3 bg-primary rounded-full animate-bounce"></span>
                <span className="w-3 h-3 bg-secondary rounded-full animate-bounce delay-150"></span>
                <span className="w-3 h-3 bg-accent rounded-full animate-bounce delay-300"></span>
            </div>

            {/* Loading text */}
            <p className="text-lg font-bold text-primary tracking-wide animate-pulse">
                Loading magic for you...
            </p>
        </div>
    );
};

export default Loading;