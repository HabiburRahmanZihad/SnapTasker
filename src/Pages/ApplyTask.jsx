import { useContext, useState } from "react";
import Lottie from "lottie-react";
import applyTaskLottie from "../../public/Lottie/applyLottie.json";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const ApplyTask = () => {
    const { title, _id } = useLoaderData();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Improved URL regex for validation
    const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const applicationData = {
            taskId: _id,
            jobTitle: title,
            applicantEmail: form.email.value.trim(),
            applicantName: form.name.value.trim(),
            resume: form.resume.value.trim(),
            linkedin: form.linkedin.value.trim(),
            github: form.github.value.trim(),
            facebook: form.facebook.value.trim(),
            reason: form.reason.value.trim(),
            appliedAt: new Date().toISOString(),
        };

        // Validate required URL fields
        const urlFields = ["resume", "linkedin", "github"];
        for (const field of urlFields) {
            if (!urlRegex.test(applicationData[field])) {
                Swal.fire({
                    icon: "error",
                    title: "Invalid URL",
                    text: `Please enter a valid URL for ${field}.`,
                });
                return;
            }
        }

        // Validate optional Facebook field (if filled)
        if (applicationData.facebook && !urlRegex.test(applicationData.facebook)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Facebook URL",
                text: "Please enter a valid Facebook profile link.",
            });
            return;
        }

        setLoading(true);

        try {
            // Check if user has already applied to this job
            const existingApplications = await axios.get(
                `${import.meta.env.VITE_API_URL}/applications?email=${applicationData.applicantEmail}&taskId=${_id}`, {
                withCredentials: true,
                }
            );

            if (existingApplications.data.length > 0) {
                setLoading(false);
                Swal.fire({
                    icon: "warning",
                    title: "Already Applied",
                    text: "You have already applied for this job.",
                });
                return;
            }

            // Submit the new application
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/applications`, applicationData, {
                withCredentials: true,
            });
            setLoading(false);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Application Submitted",
                    text: "Your application has been successfully submitted.",
                });
                form.reset();
                navigate("/myApplications");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Submission Failed",
                    text: "There was an issue submitting your application.",
                });
            }
        } catch (error) {
            setLoading(false);
            console.error("Application error:", error);
            Swal.fire({
                icon: "error",
                title: "Submission Error",
                text: "An error occurred while submitting your application.",
            });
        }
    };

    return (
        <div className="text-white p-4 flex justify-center items-center">
            <div className="flex flex-col-reverse md:flex-row items-center gap-8 max-w-6xl w-full">
                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8 rounded-lg space-y-6 shadow-xl w-full"
                >
                    <h2 className="text-center text-4xl font-extrabold">Job Requisition Form</h2>

                    <div>
                        <label htmlFor="jobTitle" className="block mb-2 font-semibold">Job Title</label>
                        <input
                            type="text"
                            id="jobTitle"
                            value={title}
                            readOnly
                            className="w-full p-3 rounded border border-gray-300 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 font-semibold">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={user?.email || ""}
                            readOnly
                            className="w-full p-3 rounded border border-gray-300 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="name" className="block mb-2 font-semibold">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={user?.displayName || ""}
                            readOnly
                            className="w-full p-3 rounded border border-gray-300 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="resume" className="block mb-2 font-semibold">Resume Link *</label>
                        <input
                            type="url"
                            name="resume"
                            id="resume"
                            required
                            placeholder="https://your-resume-link"
                            className="w-full p-3 rounded border border-gray-300 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="linkedin" className="block mb-2 font-semibold">LinkedIn Profile *</label>
                        <input
                            type="url"
                            name="linkedin"
                            id="linkedin"
                            required
                            placeholder="https://linkedin.com/in/your-profile"
                            className="w-full p-3 rounded border border-gray-300 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="github" className="block mb-2 font-semibold">GitHub Profile *</label>
                        <input
                            type="url"
                            name="github"
                            id="github"
                            required
                            placeholder="https://github.com/your-username"
                            className="w-full p-3 rounded border border-gray-300 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="facebook" className="block mb-2 font-semibold">Facebook Profile (optional)</label>
                        <input
                            type="url"
                            name="facebook"
                            id="facebook"
                            placeholder="https://facebook.com/your-profile"
                            className="w-full p-3 rounded border border-gray-300 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="reason" className="block mb-2 font-semibold">Why do you want to join us? *</label>
                        <textarea
                            name="reason"
                            id="reason"
                            rows="4"
                            required
                            className="w-full p-3 rounded border border-gray-300 focus:ring-purple-500 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        aria-busy={loading}
                        className={`block w-full font-semibold px-6 py-3 rounded-full transition ${loading
                                ? "bg-purple-400 cursor-not-allowed"
                                : "bg-purple-700 hover:bg-purple-800 text-white"
                            }`}
                    >
                        {loading ? "Submitting..." : "Continue With Us"}
                    </button>
                </form>

                {/* Lottie Animation */}
                <div className="flex-1 flex justify-center">
                    <Lottie
                        animationData={applyTaskLottie}
                        loop={true}
                        className="w-[400px] h-[400px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default ApplyTask;
