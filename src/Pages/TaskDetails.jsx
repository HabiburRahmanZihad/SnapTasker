import { LuBookUp } from "react-icons/lu";
import { MdOutlinePageview } from "react-icons/md";
import { PiBrowsersFill } from "react-icons/pi";
import { useLoaderData } from "react-router";
import { Link } from "react-router";

const TaskDetails = () => {
    const { title, description, category, email, name, budget, deadline, _id } = useLoaderData();
    const taskId = _id;

    return (
        <div className="relative bg-gradient-to-br from-primary/10 via-white to-primary/5 p-6 md:p-16 flex flex-col items-center justify-center">

            {/* Task Card */}
            <div className="w-full max-w-3xl p-8 bg-base-100/80 border border-base-300 backdrop-blur-xl shadow-2xl rounded-3xl transition-transform hover:scale-[1.02] duration-300 mb-10">
                <div className="mb-6 pb-4 border-b border-base-300">
                    <h1 className="text-4xl font-bold text-primary">{title}</h1>
                    <p className="text-lg text-primary mt-2">
                        📂 Category: <span className="font-semibold">{category}</span>
                    </p>
                </div>

                <div className="space-y-6 text-base-content">
                    <div>
                        <h2 className="font-semibold text-xl text-primary">📝 Description</h2>
                        <p className="mt-1 text-base">{description}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-4">
                        <div>
                            <h3 className="text-primary font-semibold">👤 Assigned By</h3>
                            <p className="text-base">{name}</p>
                            <p className="text-sm text-base-content/70">{email}</p>
                        </div>
                        <div>
                            <h3 className="text-primary font-semibold">💰 Budget</h3>
                            <p className="text-base font-medium">${budget}</p>
                        </div>
                        <div>
                            <h3 className="text-primary font-semibold">⏰ Deadline</h3>
                            <p className="text-base font-medium">{deadline}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <Link
                    to={`/applyTask/${taskId}`}
                    className="btn btn-primary px-6 py-3 text-base font-semibold gap-2"
                >
                    Apply Now <LuBookUp size={22} />
                </Link>

                <Link
                    to="/browseTasks"
                    className="btn btn-primary px-6 py-3 text-base font-semibold gap-2"
                >
                    Browse More <PiBrowsersFill size={22} />
                </Link>

                <Link
                    to={`/viewApplications/${taskId}`}
                    className="btn btn-primary px-6 py-3 text-base font-semibold gap-2"
                >
                    View Applications <MdOutlinePageview size={22} />
                </Link>
            </div>

            {/* Background decorations */}
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/20 rounded-full hidden lg:block blur-xl"></div>
            <div className="absolute top-0 left-0 w-56 h-56 bg-primary/30 rounded-full hidden lg:block blur-xl"></div>
        </div>
    );

};

export default TaskDetails;