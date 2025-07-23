import { use } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";

const MyApplicationList = ({ myApplicationPromise }) => {
    const initialApplications = use(myApplicationPromise);
    const [applications, setApplications] = useState(initialApplications);

    const handleDelete = async (applicationId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/applications/${applicationId}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete application");

            setApplications(applications.filter(app => app._id !== applicationId));

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Your application was deleted.",
                confirmButtonColor: "#4B0082"
            });
        } catch (error) {
            console.error("Delete error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong while deleting!",
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-primary mb-8 font-rancho tracking-wide">
                🎯 You have applied for {applications.length} task{applications.length !== 1 && "s"}
            </h2>

            {applications.length > 0 ? (
                <ul className="space-y-6">
                    {applications.map((application) => (
                        <li
                            key={application._id}
                            className="bg-base-100 border border-primary/20 shadow-md hover:shadow-xl transition duration-300 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                        >
                            {/* Left Side: Info */}
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-primary">
                                    {application.jobTitle}
                                </h3>
                                <p className="text-sm text-base-content/70 mt-2">
                                    <span className="font-medium">Reason:</span> {application.reason}
                                </p>
                                <p className="text-sm text-base-content/60 mt-1">
                                    <span className="font-medium">Applied on:</span>{" "}
                                    {new Date(application.appliedAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>

                            {/* Right Side: Actions */}
                            <div className="flex gap-4">
                                <Link
                                    to={`/taskDetails/${application.taskId}`}
                                    className="text-primary hover:text-primary-focus transition transform hover:scale-110"
                                    title="View Task Details"
                                >
                                    <FaInfoCircle size={22} />
                                </Link>

                                <button
                                    onClick={() => handleDelete(application._id)}
                                    className="text-error hover:text-red-700 transition transform hover:scale-110"
                                    title="Delete Application"
                                >
                                    <MdDeleteForever size={26} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center mt-20 bg-base-100 border border-primary/10 p-10 rounded-2xl shadow">
                    <p className="text-base-content/60 text-xl">😔 You haven’t applied to any tasks yet.</p>
                </div>
            )}
        </div>
    );
};

export default MyApplicationList;