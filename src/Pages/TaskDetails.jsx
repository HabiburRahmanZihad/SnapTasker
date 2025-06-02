import { LuBookUp } from "react-icons/lu";
import { MdOutlinePageview } from "react-icons/md";
import { PiBrowsersFill } from "react-icons/pi";
import { useLoaderData } from "react-router";
import { Link } from "react-router";

const TaskDetails = () => {
    const { title, description, category, email, name, budget, deadline, _id } = useLoaderData();
    const taskId = _id;

    return (
        <div className="min-h-[calc(100vh-190px)] bg-[#E5E4E2] flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 md:p-10 transition-transform transform hover:scale-105 mb-6">
                <div className="mb-6 border-b pb-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#4B0082]">{title}</h1>
                    <p className="text-lg text-gray-500 mt-1">
                        Category: <span className="font-medium">{category}</span>
                    </p>
                </div>

                <div className="space-y-4 text-gray-700">
                    <div>
                        <h2 className="font-semibold text-lg">Description:</h2>
                        <p className="text-sm md:text-base">{description}</p>
                    </div>

                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                        <div>
                            <h3 className="font-semibold">Assigned By :</h3>
                            <p>{name}</p>
                            <p className="text-sm text-gray-500">{email}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Budget:</h3>
                            <p>${budget}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Deadline:</h3>
                            <p>{deadline}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">

                <Link
                    to={`/applyTask/${taskId}`}
                    className="bg-[#4B0082] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#5d00a6] transition duration-300 flex items-center gap-2"
                >

                    Apply
                    <LuBookUp size={25} />
                </Link>

                <Link
                    to="/browseTasks"
                    className="bg-[#4B0082] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#5d00a6] transition duration-300 flex items-center gap-2"
                >
                    Browse more tasks
                    <PiBrowsersFill size={25} />
                </Link>

                <Link
                    to={`/viewApplications/${taskId}`}
                    className="bg-[#4B0082] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#5d00a6] transition duration-300 flex items-center gap-2"
                >
                    View Applications
                    <MdOutlinePageview size={25}/>
                </Link>
            </div>
        </div>
    );
};

export default TaskDetails;