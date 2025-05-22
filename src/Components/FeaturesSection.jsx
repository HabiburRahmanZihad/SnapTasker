const FeaturesSection = () => {
    return (
        <div className="w-full bg-[#E5E4E2] py-10 px-5 md:px-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center">

                {/* Left Section */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-black mb-4">About Us</h1>
                    <p className="text-gray-700 mb-4 text-xl">
                        Snaptask is a dynamic platform connecting individuals with skilled freelancers for everyday tasks.
                        Whether you need help moving furniture, designing a logo, or developing a website, Snaptask makes it easy to post your task and receive bids from qualified freelancers.
                    </p>
                    <p className="text-gray-700 text-xl">
                        Freelancers can browse available tasks, bid based on their skills and availability, and build a reputation by completing tasks efficiently.
                        With built-in tools to manage deadlines, budgets, and communication, Snaptask empowers users to work and get work done—seamlessly.
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex-1 relative rounded-lg overflow-hidden">
                    <img
                        src="/assets/team.jpeg"
                        alt="Team working"
                        className="w-full h-72 md:h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-purple-800 text-white px-6 py-6 md:py-8 skew-y-[-5deg]">
                        <div className="skew-y-[5deg]">
                            <p className="text-2xl leading-snug font-semibold relative">
                                <span className="text-5xl font-bold text-purple-300 absolute -left-4 top-[-20px]">“</span>
                                Empowering connections between those who need help and those ready to help — that's the heart of Snaptask.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;
