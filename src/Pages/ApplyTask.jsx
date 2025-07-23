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
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/20 px-4 py-10 flex justify-center items-center">
            <div className="flex flex-col-reverse md:flex-row items-center gap-10 w-full max-w-7xl">

                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 w-full bg-base-100 border border-primary/30 shadow-xl rounded-3xl p-10 space-y-6 backdrop-blur-md"
                >
                    <h2 className="text-4xl font-extrabold text-center text-primary mb-6 font-rancho tracking-wide">
                        Job Requisition Form
                    </h2>

                    {/* Job Title */}
                    <div>
                        <label htmlFor="jobTitle" className="block mb-2 text-sm font-semibold text-primary">Job Title</label>
                        <input
                            type="text"
                            id="jobTitle"
                            value={title}
                            readOnly
                            className="input w-full bg-base-100 text-base-content border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-semibold text-primary">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={user?.email || ""}
                            readOnly
                            className="input w-full bg-base-100 text-base-content border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-semibold text-primary">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={user?.displayName || ""}
                            readOnly
                            className="input w-full bg-base-100 text-base-content border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    {/* Resume */}
                    <div>
                        <label htmlFor="resume" className="block mb-2 text-sm font-semibold text-primary">Resume Link *</label>
                        <input
                            type="url"
                            name="resume"
                            id="resume"
                            required
                            placeholder="https://your-resume-link"
                            className="input w-full bg-base-100 border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    {/* LinkedIn */}
                    <div>
                        <label htmlFor="linkedin" className="block mb-2 text-sm font-semibold text-primary">LinkedIn Profile *</label>
                        <input
                            type="url"
                            name="linkedin"
                            id="linkedin"
                            required
                            placeholder="https://linkedin.com/in/your-profile"
                            className="input w-full bg-base-100 border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    {/* GitHub */}
                    <div>
                        <label htmlFor="github" className="block mb-2 text-sm font-semibold text-primary">GitHub Profile *</label>
                        <input
                            type="url"
                            name="github"
                            id="github"
                            required
                            placeholder="https://github.com/your-username"
                            className="input w-full bg-base-100 border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    {/* Facebook */}
                    <div>
                        <label htmlFor="facebook" className="block mb-2 text-sm font-semibold text-primary">Facebook Profile (optional)</label>
                        <input
                            type="url"
                            name="facebook"
                            id="facebook"
                            placeholder="https://facebook.com/your-profile"
                            className="input w-full bg-base-100 border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    {/* Reason */}
                    <div>
                        <label htmlFor="reason" className="block mb-2 text-sm font-semibold text-primary">Why do you want to join us? *</label>
                        <textarea
                            name="reason"
                            id="reason"
                            rows="4"
                            required
                            placeholder="Let us know why you'd be a great fit..."
                            className="textarea w-full bg-base-100 border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        aria-busy={loading}
                        className={`btn w-full text-lg font-semibold text-white ${loading
                            ? "bg-primary/60 cursor-not-allowed"
                            : "bg-primary hover:bg-primary-focus"
                            } transition-all duration-300`}
                    >
                        {loading ? "Submitting..." : "Continue With Us"}
                    </button>
                </form>

                {/* Animation Section */}
                <div className="flex-1 flex justify-center">
                    <Lottie
                        animationData={applyTaskLottie}
                        loop
                        className="w-[380px] md:w-[450px] h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default ApplyTask;