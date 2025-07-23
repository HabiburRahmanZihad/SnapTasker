import { useState } from "react";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { Link, useLoaderData } from "react-router";

const categories = ["All", "Writing", "Design", "Web Development", "Marketing"];
const sortOptions = ["Ascending", "Descending"];

const BrowseTask = () => {
    const initialData = useLoaderData();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("Ascending");

    const filteredData = selectedCategory === "All"
        ? initialData
        : initialData.filter(task => task.category === selectedCategory);

    const sortedData = [...filteredData].sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);
        return sortOrder === "Ascending" ? dateA - dateB : dateB - dateA;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f0ff] to-[#e5e4f7] p-8 md:p-16">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center text-purple-800 mb-10 drop-shadow-lg">
                Explore Available Tasks
            </h1>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
                <select
                    className="select select-bordered w-full sm:w-auto bg-white border-2 border-purple-800 text-purple-800 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat}>{cat}</option>
                    ))}
                </select>

                <select
                    className="select select-bordered w-full sm:w-auto bg-white border-2 border-purple-800 text-purple-800 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    {sortOptions.map((opt) => (
                        <option key={opt}>{opt}</option>
                    ))}
                </select>
            </div>

            {/* Task Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedData.map((task, index) => (
                    <div
                        key={task._id || index}
                        className="bg-white/80 border-2 border-purple-800 rounded-3xl p-6 shadow-[4px_6px_0px_rgba(128,0,128,0.4)] backdrop-blur transition-transform hover:scale-[1.03] hover:shadow-purple-400"
                    >
                        <h2 className="text-2xl font-bold text-purple-800 mb-3">{task.title}</h2>
                        <p className="text-sm text-gray-700 mb-1">
                            <span className="font-semibold text-purple-700">Category:</span> {task.category}
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                            <span className="font-semibold text-purple-700">Deadline:</span> {task.deadline}
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                            <span className="font-semibold text-purple-700">Budget:</span> ${task.budget}
                        </p>
                        <p className="text-sm text-gray-800 mt-3 mb-5 line-clamp-3">{task.description}</p>

                        <Link
                            to={`/taskDetails/${task._id}`}
                            className="btn w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold flex items-center justify-center gap-2 transition"
                        >
                            View Details <BsFillInfoSquareFill />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrowseTask;