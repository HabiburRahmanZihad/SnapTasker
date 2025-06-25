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
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white p-8 md:p-16">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center text-purple-800 mb-10 drop-shadow-lg">Explore Available Tasks</h1>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
                <select
                    className="select select-bordered border-purple-800 bg-white text-purple-800 font-semibold"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map(cat => <option key={cat}>{cat}</option>)}
                </select>

                <select
                    className="select select-bordered border-purple-800 bg-white text-purple-800 font-semibold"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    {sortOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
            </div>

            {/* Task Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedData.map((task, index) => (
                    <div
                        key={task._id || index}
                        className="p-6 rounded-3xl shadow-xl bg-white/80 backdrop-blur border border-purple-200 hover:shadow-purple-300 hover:scale-[1.03] transition-transform duration-300"
                    >
                        <h2 className="text-2xl font-bold text-purple-800 mb-3">{task.title}</h2>
                        <p className="text-sm text-gray-600 mb-1">Category: <span className="font-medium">{task.category}</span></p>
                        <p className="text-sm text-gray-600 mb-1">Deadline: <span className="font-medium">{task.deadline}</span></p>
                        <p className="text-sm text-gray-600 mb-1">Budget: <span className="font-medium">${task.budget}</span></p>
                        <p className="text-sm text-gray-700 mt-3 mb-5 line-clamp-3">{task.description}</p>
                        <Link
                            to={`/taskDetails/${task._id}`}
                            className="btn bg-purple-700 hover:bg-purple-900 text-white font-semibold w-full flex items-center justify-center gap-2"
                        >
                            View Details <BsFillInfoSquareFill />
                        </Link>
                    </div>
                ))}
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-bl-full -z-10 opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300 rounded-tr-full -z-10 opacity-30"></div>
        </div>
    );
};

export default BrowseTask;