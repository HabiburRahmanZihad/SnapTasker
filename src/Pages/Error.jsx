import { Link } from 'react-router';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-100">
            <img
                src="/assets/error.jpg"
                alt="Error page"
                className="w-full max-w-md mb-8 rounded shadow-lg"
            />
            <h2 className="text-3xl font-semibold text-red-600 mb-2">
                Oops! Something went wrong.
            </h2>
            <p className="text-gray-700 mb-6">
                We couldn't find the page you were looking for.
            </p>
            <Link
                to="/"
                className="inline-block px-6 py-3 bg-[#4B0082] text-white text-2xl font-medium rounded hover:bg-blue-700 transition duration-300"
            >
                Go to Home
            </Link>

        </div>
    );
};

export default Error;