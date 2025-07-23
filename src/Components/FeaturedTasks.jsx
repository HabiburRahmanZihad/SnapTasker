import { useState, useEffect } from "react";
import { Link } from "react-router";

const FeaturedTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/recentTasks`);

                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }

                const data = await response.json();
                setTasks(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching tasks:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    // Format date for better display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-base-200 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-primary">Featured Tasks</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-error">
                        <p>{error}</p>
                        <p>Please try again later</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className="bg-base-100 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded">
                                            {task.category}
                                        </span>
                                        <span className="text-sm text-base-content opacity-60">
                                            Due: {formatDate(task.deadline)}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-base-content mb-2">
                                        {task.title}
                                    </h3>

                                    <p className="text-base-content opacity-70 mb-4 line-clamp-2">
                                        {task.description}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-base-content opacity-70">
                                            <p>Posted by: {task.name}</p>
                                        </div>
                                        <div className="font-bold text-primary">
                                            ${task.budget}
                                        </div>
                                    </div>

                                    <Link
                                        to={`/taskDetails/${task._id}`}
                                        className="mt-4 block w-full bg-primary text-white text-center py-2 rounded-md hover:bg-primary-focus transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && tasks.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-base-content opacity-60 text-lg">No tasks available at the moment</p>
                    </div>
                )}

                <div className="text-center mt-8">
                    <Link
                        to="/browseTasks"
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-focus transition"
                    >
                        View All Tasks
                    </Link>
                </div>
            </div>
        </div>
    );

};

export default FeaturedTasks;