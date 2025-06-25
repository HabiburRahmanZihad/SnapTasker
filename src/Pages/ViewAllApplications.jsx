import { IoLogoAppleAr } from "react-icons/io5";
import { Link, useLoaderData } from "react-router";

const ViewAllApplications = () => {
    const applications = useLoaderData();

    return (
        <div className="relative bg-gradient-to-tr from-purple-100 via-white to-purple-200 py-10 px-4 md:px-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-purple-900">
                    {applications.length} Application{applications.length !== 1 && "s"} for this Task
                </h1>

                <Link to="/browseTasks">
                    <button className="flex items-center gap-2 bg-purple-700 text-white px-6 py-2.5 rounded-xl hover:bg-purple-900 shadow-lg transition-all">
                        Browse Tasks <IoLogoAppleAr size={22} />
                    </button>
                </Link>
            </div>

            {/* Applications */}
            <div className="max-w-7xl mx-auto">
                {applications.length === 0 ? (
                    <div className="text-center text-xl text-gray-600 bg-white/60 backdrop-blur-md p-10 rounded-2xl shadow-inner">
                        🚫 No applications found for this task.
                    </div>
                ) : (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {applications.map((app) => (
                            <div
                                key={app._id}
                                className="bg-white/80 backdrop-blur-lg border border-purple-200 rounded-3xl p-6 shadow-md hover:shadow-xl transition-transform hover:scale-[1.02]"
                            >
                                <h2 className="text-xl font-bold text-purple-800 mb-1">
                                    {app.applicantName}
                                </h2>
                                <p className="text-sm text-gray-700 mb-2">
                                    <span className="font-semibold">✉️ Email:</span> {app.applicantEmail}
                                </p>

                                <p className="text-sm text-gray-700 mb-2">
                                    <span className="font-semibold">💼 Job Title:</span> {app.jobTitle}
                                </p>

                                <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                                    <span className="font-semibold">🧠 Reason:</span> {app.reason}
                                </p>

                                <p className="text-xs text-gray-500 mt-2">
                                    <strong>🕒 Applied At:</strong>{" "}
                                    {new Date(app.appliedAt).toLocaleString()}
                                </p>

                                {/* Links */}
                                <div className="mt-4">
                                    <p className="font-semibold text-purple-700 mb-1">🌐 Links:</p>
                                    <ul className="list-disc list-inside space-y-1 text-purple-800 text-sm">
                                        {app.resume && (
                                            <li>
                                                <a
                                                    href={app.resume}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="hover:underline"
                                                >
                                                    📄 Resume
                                                </a>
                                            </li>
                                        )}
                                        {app.linkedin && (
                                            <li>
                                                <a
                                                    href={app.linkedin}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="hover:underline"
                                                >
                                                    🔗 LinkedIn
                                                </a>
                                            </li>
                                        )}
                                        {app.github && (
                                            <li>
                                                <a
                                                    href={app.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="hover:underline"
                                                >
                                                    💻 GitHub
                                                </a>
                                            </li>
                                        )}
                                        {app.facebook && (
                                            <li>
                                                <a
                                                    href={app.facebook}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="hover:underline"
                                                >
                                                    📘 Facebook
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

            {/* Background Elements */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-purple-300 opacity-20 rounded-full hidden lg:block " />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 opacity-30 rounded-full hidden lg:block " />
        </div>
    );
};

export default ViewAllApplications;