import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-black px-6 text-center transition-all duration-300">

            <img
                src="/assets/error.jpg"
                alt="Error Illustration"
                className="w-full max-w-md mb-8 rounded-xl shadow-2xl border-4 border-white/60 dark:border-gray-700 hover:scale-105 hover:rotate-1 transition-all duration-500"
            />

            <h2 className="text-4xl md:text-5xl font-extrabold text-red-600 dark:text-red-400 mb-4 drop-shadow">
                ⚠️ Whoops! Page Not Found.
            </h2>

            <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
                The page you're looking for doesn't seem to exist — maybe it's hiding in the shadow realm. 🕳️
            </p>

            <Link
                to="/"
                className="inline-flex items-center gap-3 px-6 py-3 text-lg font-semibold bg-[#4B0082] hover:bg-indigo-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
                <FaArrowLeft className="animate-pulse" />
                Take Me Home
            </Link>
        </div>
    );
};

export default Error;