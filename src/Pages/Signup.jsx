import { FaGoogle } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { use } from "react";
import Swal from "sweetalert2";

const Signup = () => {
    const { createUser, loginGoogle, updateUserProfile } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Get the redirect path, default to "/"
    const from = location.state || "/";


    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const { email, password } = Object.fromEntries(formData.entries());

        // Simple password checks
        if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must include at least one uppercase letter.",
            });

            return;
        }

        if (!/[a-z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must include at least one lowercase letter.",
            });
            return;
        }

        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must be at least 6 characters long.",
            });
            return;
        }

        createUser(email, password)
            .then(() => {
                //Update user profile
                const name = formData.get("name");
                const photoUrl = formData.get("photoUrl");
                const user = {
                    displayName: name,
                    photoURL: photoUrl,
                };
                // Assuming you have a method to update user profile
                updateUserProfile(user)
                    .then(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User created successfully!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        form.reset(); // Reset the form after successful sign-up

                        // Redirect to the previous page or default to "/"
                        navigate(from, { replace: true });  // redirect to original page
                    })
                    .catch((error) => {
                        console.error("Error updating user profile:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Failed to update user profile.",
                        });
                    });
            })
            .catch((error) => {
                console.error("Signup error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to sign up. Please check your email and password.",
                });
            });
    };


    const handleGoogleSignup = () => {
        // Add Google signup logic here
        loginGoogle()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User signed in with Google successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                // Optionally, you can redirect or show a success message here
                navigate(from, { replace: true });  // redirect to original page
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
                // Optionally, you can show an error message here
            });
    };


    return (
        <>
            <div
                className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
                style={{
                    backgroundImage: "url('/assets/signup.jpeg')",
                }}
            >
                <div className="bg-white/10 backdrop-blur-lg text-white px-12 py-10 rounded-2xl shadow-2xl w-full max-w-xl border border-white/20">
                    <h2 className="text-4xl rancho font-bold text-center mb-10">Sign Up Now ! ! !</h2>


                    {/*SignUp Form */}
                    <form onSubmit={handleSubmit}>

                        <div className="mb-8">
                            <label htmlFor="fullname" className="block text-lg mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none py-3"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>



                        <div className="mb-8">
                            <label htmlFor="photoUrl" className="block text-lg mb-2">
                                Photo URL
                            </label>
                            <input
                                type="url"
                                name="photoUrl"
                                className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none py-3"
                                placeholder="Enter your photo URL"
                                required
                            />
                        </div>

                        <div className="mb-8">
                            <label htmlFor="email" className="block text-lg mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none py-3"
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
                                className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none py-3"
                                placeholder="Enter your password"
                                required
                            />
                        </div>


                        <button
                            type="submit"
                            aria-label="Sign Up"
                            className="w-full flex items-center justify-center gap-2 text-2xl font-semibold py-3 rounded-md bg-white text-[#4B0082] rancho transition hover:bg-[#4B0082] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#4B0082]"
                        >
                            <SiGnuprivacyguard size={25} />
                            Sign Up
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow h-px bg-white/30"></div>
                        <span className="px-4 text-white text-2xl rancho">or</span>
                        <div className="flex-grow h-px bg-white/30"></div>
                    </div>

                    {/* Social Signup Buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={handleGoogleSignup}
                            className="w-full flex items-center justify-center gap-3 text-2xl rancho bg-white text-[#4B0082] font-semibold py-3 rounded-md hover:bg-[#4B0082] hover:text-white transition border border-white/30"
                        >
                            <FaGoogle size={25} />
                            Continue with Google
                        </button>
                    </div>



                    <p className="mt-8 text-center text-base">
                        Already have an account?{" "}
                        <Link to={'/signin'} className="underline ">
                            Signin
                        </Link>
                    </p>

                </div>
            </div>
        </>
    );
};

export default Signup;