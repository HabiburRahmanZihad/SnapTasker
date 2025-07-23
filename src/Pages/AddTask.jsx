import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import addTask from "../../public/Lottie/addTask.json";
import axios from "axios";

const AddTask = () => {
    const { user } = useContext(AuthContext);

    const handleAddTask = async (e) => {
        e.preventDefault();
        const form = e.target;
        const taskData = {
            title: form.title.value,
            category: form.category.value,
            description: form.description.value,
            deadline: form.deadline.value,
            budget: form.budget.value,
            email: user?.email || "no email",
            name: user?.displayName || "beluga"
        };

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/task`, taskData, {
                withCredentials: true,
            });

            if (res.data.acknowledged) {
                Swal.fire({
                    icon: "success",
                    title: "Task added successfully!",
                    timer: 1500,
                    showConfirmButton: false,
                    position: "top-end",
                });
                form.reset();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong while adding your task.",
            });
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-base-200 to-base-100 px-6 py-12 gap-10">
            {/* Lottie Animation */}
            <div className="w-full max-w-lg">
                <Lottie animationData={addTask} loop className="w-full h-auto" />
            </div>

            {/* Task Form */}
            <form
                onSubmit={handleAddTask}
                className="w-full max-w-xl bg-base-100/80 backdrop-blur-xl border border-base-300 shadow-2xl rounded-3xl p-8 space-y-6"
            >
                <h2 className="text-4xl font-extrabold text-center text-primary mb-4">
                    Add New Task
                </h2>

                {/* Title */}
                <div>
                    <label className="text-base-content font-medium block mb-1">
                        Title
                    </label>
                    <input
                        name="title"
                        type="text"
                        required
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter task title"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="text-base-content font-medium block mb-1">
                        Category
                    </label>
                    <select
                        name="category"
                        required
                        className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <option value="">Select category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Design">Design</option>
                        <option value="Writing">Writing</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="text-base-content font-medium block mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows="4"
                        required
                        className="textarea textarea-bordered w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter task description"
                    />
                </div>

                {/* Deadline & Budget */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                        <label className="text-base-content font-medium block mb-1">
                            Deadline
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            required
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div className="w-full">
                        <label className="text-base-content font-medium block mb-1">
                            Budget ($)
                        </label>
                        <input
                            type="number"
                            name="budget"
                            placeholder="e.g. 500"
                            required
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>
                </div>

                {/* Email & Name (Disabled) */}
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="email"
                        value={user?.email || "no email"}
                        disabled
                        className="input input-disabled w-full"
                    />
                    <input
                        type="text"
                        value={user?.displayName || "Anonymous"}
                        disabled
                        className="input input-disabled w-full"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full text-lg font-semibold"
                >
                    🚀 Submit Task
                </button>
            </form>
        </div>
    );

};

export default AddTask;