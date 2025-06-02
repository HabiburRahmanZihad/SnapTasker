import { useContext, useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiData } from "react-icons/bi";
import Swal from "sweetalert2";

const PostedTask = () => {
    const { user } = useContext(AuthContext);
    const initialData = useLoaderData();
    const [bidsCount, setBidsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const filteredTasks = initialData.filter(task => task.email === user?.email);
    const [tasks, setTasks] = useState(filteredTasks);

    // Load bids count from database when component mounts
    useEffect(() => {
        const fetchBidCount = async () => {
            if (user?.email) {
                try {
                    setLoading(true);
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/bids/user/${user.email}`);
                    const bids = await response.json();

                    // Check if we got an array of bids back
                    if (Array.isArray(bids)) {
                        setBidsCount(bids.length);
                    } else {
                        console.error("Expected array of bids but got:", bids);
                        setBidsCount(0);
                    }
                } catch (error) {
                    console.error("Error fetching bid count:", error);
                    setBidsCount(0);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBidCount();
    }, [user?.email]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // delete task from database
                fetch(`${import.meta.env.VITE_API_URL}/task/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            const remainingTasks = tasks.filter(task => task._id !== id);
                            setTasks(remainingTasks);
                            Swal.fire("Deleted!", "Your task has been deleted.", "success");
                        }
                    });
            }
        });
    };

    const handleBidClick = (taskId) => {
        if (!user?.email) {
            Swal.fire({
                icon: "error",
                title: "Authentication Required",
                text: "Please log in to place a bid"
            });
            return;
        }

        // Find the task details
        const task = tasks.find(t => t._id === taskId);
        if (!task) {
            console.error("Task not found");
            return;
        }

        // Create bid object to send to database
        const bidData = {
            taskId,
            userEmail: user.email,
            bidDate: new Date(),
            // Store additional info that might be useful
            taskTitle: task.title,
            taskCategory: task.category,
            taskBudget: task.budget
        };

        // Check if this user has already bid on this task
        fetch(`${import.meta.env.VITE_API_URL}/bids/check/${user.email}/${taskId}`)
            .then(res => res.json())
            .then(data => {
                if (data.exists) {
                    // User has already bid on this task
                    Swal.fire({
                        icon: "info",
                        title: "Already Bid",
                        text: "You have already placed a bid on this task"
                    });
                    return;
                }

                // Save bid to database if user hasn't bid yet
                return fetch(`${import.meta.env.VITE_API_URL}/bids`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bidData)
                });
            })
            .then(res => {
                if (!res) return null; // Early return if we already showed the "already bid" message
                return res.json();
            })
            .then(data => {
                if (!data) return; // Early return if we already showed the "already bid" message

                if (data.insertedId || data.success) {
                    // Update the local bid count
                    const newBidsCount = bidsCount + 1;
                    setBidsCount(newBidsCount);

                    // Show success notification
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Bid submitted successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.error("Error submitting bid:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to submit bid. Please try again."
                });
            });
    };

    return (
        <div className="px-4 py-8 sm:px-6 lg:px-12 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-semibold text-center text-[#4B0082] mb-4">My Posted Tasks</h2>

            {/* Display bid count */}
            {loading ? (
                <p className="text-center text-lg text-gray-700 mb-6">Loading bid information...</p>
            ) : (
                <p className="text-center text-lg text-gray-700 mb-6">
                    You bid for {bidsCount} opportunities.
                </p>
            )}

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#4B0082]">
                        <tr className="text-xl" >
                            <th className="px-6 py-4 text-left font-medium text-white uppercase tracking-wider">Title</th>
                            <th className="px-6 py-4 text-left font-medium text-white uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left font-medium text-white uppercase tracking-wider">Budget</th>
                            <th className="px-6 py-4 text-left font-medium text-white uppercase tracking-wider">Deadline</th>
                            <th className="px-6 py-4 text-center font-medium text-white uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {tasks.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-lg">
                                    You haven't posted any tasks yet.
                                </td>
                            </tr>
                        ) : (
                            tasks.map((task, index) => (
                                <tr
                                    key={task._id}
                                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{task.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-600">{task.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg text-green-600 font-medium">${task.budget}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">
                                        {typeof task.deadline === 'string'
                                            ? new Date(task.deadline).toLocaleDateString()
                                            : task.deadline instanceof Date
                                                ? task.deadline.toLocaleDateString()
                                                : task.deadline}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <Link
                                                to={`/updatetask/${task._id}`}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-md transition-all duration-200"
                                            >
                                                <FaPencilAlt />
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md transition-all duration-200"
                                            >
                                                <MdDeleteForever />
                                            </button>

                                            <button
                                                onClick={() => handleBidClick(task._id)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition-all duration-200"
                                            >
                                                <BiData />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostedTask;