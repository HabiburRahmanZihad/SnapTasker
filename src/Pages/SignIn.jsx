import { FaGoogle } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { use } from "react";
import Swal from "sweetalert2";

const SignIn = () => {
    const { signInUser, loginGoogle } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Get the redirect path, default to "/"
    const from = location.state || "/";


    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Call the signInUser function from AuthContext
        signInUser(email, password)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User signed in successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset(); // Reset the form after successful sign-in
                navigate(from, { replace: true });  // redirect to original page
            })
            .catch((error) => {
                console.error("Error signing in:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to sign in. Please check your email and password.",
                });
            });
    };

    const handleGoogleSignin = () => {

        // Add Google sign-in logic here

        loginGoogle()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User signed in with Google successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                // Optionally, you can redirect or show a success message here
                navigate(from, { replace: true });  // redirect to original page
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
                // Optionally, you can show an error message here
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to sign in with Google. Please try again.",
                });
            });
    };


    return (
        <div
            className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
            style={{
                backgroundImage: "url('/assets/signin.jpeg')",
            }}
        >
            <div className="bg-white/10 backdrop-blur-xl text-white px-12 py-10 rounded-2xl shadow-2xl w-full max-w-xl border border-white/20">
                <h2 className="text-4xl font-bold text-center mb-10 font-rancho">
                    Sign In Now!
                </h2>

                {/* Sign In Form */}
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
                        />
                    </div>

                    <button
                        type="submit"
                        aria-label="Sign in to your account"
                        className="w-full flex items-center justify-center gap-2 text-2xl font-semibold py-3 rounded-md bg-white text-[#4B0082] font-rancho transition duration-200 hover:bg-[#4B0082] hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    >
                        <PiSignInBold size={25} />
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-white/30"></div>
                    <span className="px-4 text-white text-2xl font-rancho">or</span>
                    <div className="flex-grow h-px bg-white/30"></div>
                </div>

                {/* Social Sign In */}
                <div className="space-y-4">
                    <button
                        onClick={handleGoogleSignin}
                        className="w-full flex items-center justify-center gap-3 text-2xl font-rancho bg-white text-[#4B0082] font-semibold py-3 rounded-md hover:bg-[#4B0082] hover:text-white transition border border-white/30"
                    >
                        <FaGoogle size={25} />
                        Continue with Google
                    </button>
                </div>

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