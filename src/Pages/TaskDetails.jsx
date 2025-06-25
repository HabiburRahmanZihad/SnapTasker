import { LuBookUp } from "react-icons/lu";
import { MdOutlinePageview } from "react-icons/md";
import { PiBrowsersFill } from "react-icons/pi";
import { useLoaderData } from "react-router";
import { Link } from "react-router";

const TaskDetails = () => {
    const { title, description, category, email, name, budget, deadline, _id } = useLoaderData();
    const taskId = _id;

    return (
        <div className="relative bg-gradient-to-br from-purple-100 via-white to-purple-50 p-6 md:p-16 flex flex-col items-center justify-center">

            {/* Glassmorphism Task Card */}
            <div className="w-full max-w-3xl p-8 bg-white/80 border border-purple-200 backdrop-blur-xl shadow-2xl rounded-3xl transition-transform hover:scale-[1.02] duration-300 mb-10">
                <div className="mb-6 pb-4 border-b border-purple-200">
                    <h1 className="text-4xl font-bold text-purple-900">{title}</h1>
                    <p className="text-lg text-purple-700 mt-2">📂 Category: <span className="font-semibold">{category}</span></p>
                </div>

                <div className="space-y-6 text-gray-800">
                    <div>
                        <h2 className="font-semibold text-xl text-purple-800">📝 Description</h2>
                        <p className="mt-1 text-base">{description}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-4">
                        <div>
                            <h3 className="text-purple-700 font-semibold">👤 Assigned By</h3>
                            <p className="text-base">{name}</p>
                            <p className="text-sm text-gray-500">{email}</p>
                        </div>
                        <div>
                            <h3 className="text-purple-700 font-semibold">💰 Budget</h3>
                            <p className="text-base font-medium">${budget}</p>
                        </div>
                        <div>
                            <h3 className="text-purple-700 font-semibold">⏰ Deadline</h3>
                            <p className="text-base font-medium">{deadline}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <Link
                    to={`/applyTask/${taskId}`}
                    className="bg-purple-700 hover:bg-purple-900 text-white font-semibold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition duration-300"
                >
                    Apply Now <LuBookUp size={22} />
                </Link>

                <Link
                    to="/browseTasks"
                    className="bg-purple-700 hover:bg-purple-900 text-white font-semibold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition duration-300"
                >
                    Browse More <PiBrowsersFill size={22} />
                </Link>

                <Link
                    to={`/viewApplications/${taskId}`}
                    className="bg-purple-700 hover:bg-purple-900 text-white font-semibold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition duration-300"
                >
                    View Applications <MdOutlinePageview size={22} />
                </Link>
            </div>

            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full hidden lg:block opacity-50"></div>
            <div className="absolute top-0 left-0 w-56 h-56 bg-purple-300 rounded-full  hidden lg:block opacity-50"></div>
        </div>
    );
};

export default TaskDetails;