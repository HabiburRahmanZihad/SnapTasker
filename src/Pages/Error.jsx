import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-tr from-gray-100 to-white text-center">
            <img
                src="/assets/error.jpg"
                alt="Error Illustration"
                className="w-full max-w-md mb-8 rounded-xl shadow-lg transition-transform hover:scale-105 duration-300"
            />

            <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
                Oops! Page Not Found.
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl">
                It looks like the page you’re looking for doesn’t exist or has been moved.
            </p>

            <Link
                to="/"
                className="inline-flex items-center gap-3 px-6 py-3 text-xl font-semibold bg-[#4B0082] text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
            >
                <FaArrowLeft />
                Back to Home
            </Link>
        </div>
    );
};

export default Error;