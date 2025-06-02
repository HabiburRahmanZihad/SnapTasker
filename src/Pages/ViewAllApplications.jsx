import { IoLogoAppleAr } from "react-icons/io5";
import { Link, useLoaderData } from "react-router";

const ViewAllApplications = () => {
    const applications = useLoaderData();

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">

            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">

                <h1 className="text-3xl font-bold text-gray-800">
                    ({applications.length}) Applicant - apply to this task
                </h1>

                <Link to="/browseTasks">
                    <button className="bg-blue-600 btn text-white px-5 py-2 rounded hover:bg-blue-700 transition">
                        Browse Tasks <IoLogoAppleAr size={20} />
                    </button>
                </Link>

            </div>

            {applications.length === 0 ? (
                <p className="text-gray-600 text-xl">No applications found for this task.</p>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                    {applications.map(app => (
                        <div
                            key={app._id}
                            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-6"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {app.applicantName}
                            </h2>

                            <p className="text-gray-600"><strong>Email:</strong> {app.applicantEmail}</p>

                            <p className="text-gray-600"><strong>Job Title:</strong> {app.jobTitle}</p>

                            <p className="text-gray-600"><strong>Reason:</strong> {app.reason}</p>

                            <p className="text-gray-500 text-sm mt-2">
                                <strong>Applied At:</strong>{" "}
                                {new Date(app.appliedAt).toLocaleString()}
                            </p>

                            <div className="mt-4">

                                <strong className="text-gray-700">Links:</strong>
                                <ul className="list-disc list-inside text-blue-600 space-y-1">

                                    {app.resume && (
                                        <li>
                                            <a href={app.resume} target="_blank" rel="noreferrer" className="hover:underline">
                                                Resume
                                            </a>
                                        </li>
                                    )}

                                    {app.linkedin && (
                                        <li>
                                            <a href={app.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                                                LinkedIn
                                            </a>
                                        </li>
                                    )}

                                    {app.github && (
                                        <li>
                                            <a href={app.github} target="_blank" rel="noreferrer" className="hover:underline">
                                                GitHub
                                            </a>
                                        </li>
                                    )}

                                    {app.facebook && (
                                        <li>
                                            <a href={app.facebook} target="_blank" rel="noreferrer" className="hover:underline">
                                                Facebook
                                            </a>
                                        </li>
                                    )}

                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewAllApplications;