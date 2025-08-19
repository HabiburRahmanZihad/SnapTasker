import { FaGoogle } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const SignIn = () => {
    const { signInUser, loginGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const from = location.state || "/";

    // Handle email/password login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // start loading

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await signInUser(email, password);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User signed in successfully",
                showConfirmButton: false,
                timer: 1500
            });
            form.reset();
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Error signing in:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to sign in. Please check your email and password.",
            });
        } finally {
            setIsLoading(false); // ✅ always reset loading
        }
    };

    // Handle Google login
    const handleGoogleSignin = async () => {
        setIsLoading(true);

        try {
            await loginGoogle();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User signed in with Google successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Error signing in with Google:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to sign in with Google. Please try again.",
            });
        } finally {
            setIsLoading(false); // ✅ always reset loading
        }
    };

    return (
        <div
            className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
            style={{ backgroundImage: "url('/assets/signin.jpeg')" }}
        >
            <div className="bg-white/10 backdrop-blur-xl text-white px-12 py-10 rounded-2xl shadow-2xl w-full max-w-xl border border-white/20">
                <h2 className="text-4xl font-bold text-center mb-10 font-rancho">
                    Sign In Now!
                </h2>

                {/* Email/Password Sign In Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                        <label htmlFor="email" className="block text-lg mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="w-full bg-transparent border-b-2 border-white text-white placeholder-white/70 focus:outline-none focus:border-primary py-3 transition"
                            placeholder="Enter your email"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-8">
                        <label htmlFor="password" className="block text-lg mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full bg-transparent border-b-2 border-white text-white placeholder-white/70 focus:outline-none focus:border-primary py-3 transition"
                            placeholder="Enter your password"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {/* Loading-aware button */}
                    <button
                        type="submit"
                        aria-label="Sign in to your account"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-2 text-2xl font-semibold py-3 rounded-md font-rancho transition duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                            ${isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-white text-[#4B0082] hover:bg-[#4B0082] hover:text-white"
                            }`}
                    >
                        {isLoading ? (
                            <span className="animate-spin border-2 border-t-transparent rounded-full w-5 h-5"></span>
                        ) : (
                            <PiSignInBold size={25} />
                        )}
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-white/30"></div>
                    <span className="px-4 text-white text-2xl font-rancho">or</span>
                    <div className="flex-grow h-px bg-white/30"></div>
                </div>

                {/* Google Sign In */}
                <div className="space-y-4">
                    <button
                        onClick={handleGoogleSignin}
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-3 text-2xl font-rancho font-semibold py-3 rounded-md transition border border-white/30
                            ${isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-white text-[#4B0082] hover:bg-[#4B0082] hover:text-white"
                            }`}
                    >
                        {isLoading ? (
                            <span className="animate-spin border-2 border-t-transparent rounded-full w-5 h-5"></span>
                        ) : (
                            <FaGoogle size={25} />
                        )}
                        {isLoading ? "Signing in..." : "Continue with Google"}
                    </button>
                </div>

                {/* Sign Up redirect */}
                <p className="mt-8 text-center text-base text-white/90">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="underline hover:text-white">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;