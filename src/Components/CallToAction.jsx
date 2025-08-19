import { Link } from "react-router";

const CallToAction = () => {
    return (
        <div className="relative bg-primary py-20 px-5 md:px-10 rounded-2xl overflow-hidden">
            <div className="max-w-5xl mx-auto text-center text-primary-content relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Ready to Boost Your Productivity?
                </h1>
                <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                    Join thousands of users who trust SnapTask to manage tasks, hire
                    skilled freelancers, and get work done—smarter and faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/signin" className="px-8 py-4 bg-base-100 text-primary font-semibold rounded-lg shadow-md hover:bg-base-200 transition">
                        Get Started Free
                    </Link>
                    <Link to="/browseTasks" className="px-8 py-4 border border-primary-content text-primary-content font-semibold rounded-lg hover:bg-base-100 hover:text-primary transition">
                        Learn More
                    </Link>
                </div>
            </div>

            {/* Decorative background accents */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-black/10 rounded-full blur-3xl"></div>
        </div>
    );
};

export default CallToAction;