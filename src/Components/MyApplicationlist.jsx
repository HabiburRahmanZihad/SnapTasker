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

            if (!response.ok) {
                throw new Error("Failed to delete application");
            }

            // Filter out the deleted application from state
            setApplications(applications.filter(app => app._id !== applicationId));

            Swal.fire({
                title: "Success",
                text: "Application deleted successfully.",
                icon: "success",
                confirmButtonText: "OK"
            })
        } catch (error) {
            console.error("Error deleting application:", error);
            // sweetAlert("Error", "Failed to delete application.", "error");
            Swal.fire({
                title: "Error",
                text: "Failed to delete application.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl mb-5 font-bold text-center text-[#4B0082]">
                You have applied for {applications.length} tasks
            </h1>
            <ul className="space-y-4 max-w-4xl mx-auto">
                {applications.length > 0 ? (
                    applications.map((application) => (
                        <li
                            key={application._id}
                            className="p-4 sm:p-6 bg-white rounded-lg shadow hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4"
                        >
                            <div className="flex-1">
                                <h2 className="text-lg sm:text-xl font-semibold text-indigo-600">
                                    {application.jobTitle}
                                </h2>

                                <p className="text-sm sm:text-base text-gray-700 mt-2">
                                    <span className="font-medium">Reason:</span> {application.reason}
                                </p>

                                <p className="text-sm sm:text-base text-gray-500 mt-1">
                                    <span className="font-medium">Applied on:</span>{" "}
                                    {new Date(application.appliedAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>

                            <div className="flex items-center space-x-4">

                                <Link
                                    to={`/taskDetails/${application.taskId}`}
                                    className="text-indigo-500 hover:text-indigo-700"
                                    title="View Details"
                                >
                                    <FaInfoCircle size={22} />
                                </Link>


                                <button
                                    onClick={() => handleDelete(application._id)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete Application"
                                >
                                    <MdDeleteForever size={25} />
                                </button>

                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-center text-xl text-gray-500 py-8 bg-white rounded-lg shadow">
                        No applications found.
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MyApplicationList;