import { useContext, useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiData } from "react-icons/bi";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";

const PostedTask = () => {
    const { user } = useContext(AuthContext);
    const initialData = useLoaderData();
    const [bidsCount, setBidsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const filteredTasks = initialData.filter(task => task.email === user?.email);
    const [tasks, setTasks] = useState(filteredTasks);

    useEffect(() => {
        const fetchBidCount = async () => {
            if (user?.email) {
                try {
                    setLoading(true);
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/bids/user/${user.email}`);
                    const bids = await response.json();
                    setBidsCount(Array.isArray(bids) ? bids.length : 0);
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

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won’t be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4B0082",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_URL}/task/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            setTasks(prev => prev.filter(task => task._id !== id));
                            Swal.fire("Deleted!", "Your task has been deleted.", "success");
                        }
                    });
            }
        });
    };

    const handleBidClick = async (taskId) => {
        if (!user?.email) {
            Swal.fire({ icon: "error", title: "Login Required", text: "Please log in to bid." });
            return;
        }

        const task = tasks.find(t => t._id === taskId);
        const bidData = {
            taskId,
            userEmail: user.email,
            bidDate: new Date(),
            taskTitle: task.title,
            taskCategory: task.category,
            taskBudget: task.budget
        };

        const checkRes = await fetch(`${import.meta.env.VITE_API_URL}/bids/check/${user.email}/${taskId}`);
        const checkData = await checkRes.json();

        if (checkData.exists) {
            Swal.fire({ icon: "info", title: "Already Bid", text: "You already bid on this task." });
            return;
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/bids`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bidData)
        });
        const result = await res.json();

        if (result.insertedId || result.success) {
            setBidsCount(prev => prev + 1);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Bid submitted!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="bg-gradient-to-tr from-primary/10 to-base-200 px-4 py-10 min-h-screen">
            <h2 className="text-4xl font-bold text-center text-primary mb-4">My Posted Tasks</h2>

            <div className="text-center mb-10">
                {loading ? (
                    <Loading></Loading>
                ) : (
                    <p className="text-lg font-medium text-primary">
                        You have <span className="font-bold text-primary">{bidsCount}</span> bids placed.
                    </p>
                )}
            </div>

            {tasks.length === 0 ? (
                <div className="text-center text-base-content/60 text-xl mt-20">
                    😢 You haven’t posted any tasks yet.
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {tasks.map(task => (
                        <div
                            key={task._id}
                            className="bg-base-100 border border-base-300 rounded-2xl shadow-md p-6 transition hover:shadow-xl"
                        >
                            <h3 className="text-2xl font-bold text-primary mb-2">{task.title}</h3>
                            <p className="text-base-content mb-1"><strong>Category:</strong> {task.category}</p>
                            <p className="text-base-content mb-1"><strong>Budget:</strong> ${task.budget}</p>
                            <p className="text-base-content mb-4">
                                <strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to={`/updatetask/${task._id}`}
                                    className="btn btn-warning btn-sm text-white gap-2"
                                >
                                    <FaPencilAlt />
                                    Edit
                                </Link>

                                <button
                                    onClick={() => handleDelete(task._id)}
                                    className="btn btn-error btn-sm text-white gap-2"
                                >
                                    <MdDeleteForever />
                                    Delete
                                </button>

                                <button
                                    onClick={() => handleBidClick(task._id)}
                                    className="btn btn-info btn-sm text-white gap-2"
                                >
                                    <BiData />
                                    Bid
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

};

export default PostedTask;