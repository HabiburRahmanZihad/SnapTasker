import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateTask = () => {
    const { user } = useContext(AuthContext);
    const task = useLoaderData();
    const navigate = useNavigate();

    const handleUpdateTask = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const description = form.description.value;
        const deadline = form.deadline.value;
        const budget = form.budget.value;
        const email = user?.email || "no email";
        const name = user?.displayName || "beluga";

        const updatedTaskData = {
            title,
            category,
            description,
            deadline,
            budget,
            email,
            name
        };

        fetch(`${import.meta.env.VITE_API_URL}/task/${task._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTaskData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Task updated successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/postedTasks');
                }
            });
    }

    return (
        <form
            onSubmit={handleUpdateTask}
            className="max-w-2xl mx-auto mt-12 p-10 rounded-3xl backdrop-blur-xl 
            bg-[url('/assets/updateTask.jpg')] bg-cover bg-center bg-no-repeat 
            border border-primary/20 shadow-2xl hover:shadow-primary transition duration-300"
        >
            <h2 className="text-4xl font-extrabold text-center text-white mb-8 font-rancho tracking-wider">
                ✏️ Update Your Task
            </h2>

            <div className="flex flex-col gap-5">
                {/* Title */}
                <input
                    type="text"
                    name="title"
                    required
                    defaultValue={task?.title}
                    placeholder="Task Title"
                    className="input bg-white/20 text-white placeholder-white border-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {/* Category */}
                <select
                    name="category"
                    required
                    defaultValue={task?.category}
                    className="select bg-white/20 text-white border-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option disabled value="">Select Category</option>
                    <option className="bg-base-300" value="Web Development">Web Development</option>
                    <option className="bg-base-300" value="Design">Design</option>
                    <option className="bg-base-300" value="Writing">Writing</option>
                    <option className="bg-base-300" value="Marketing">Marketing</option>
                </select>

                {/* Description */}
                <textarea
                    name="description"
                    rows="4"
                    required
                    defaultValue={task?.description}
                    placeholder="Task Description"
                    className="textarea bg-white/20 text-white placeholder-white border-white/30 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />

                {/* Deadline & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="date"
                        name="deadline"
                        required
                        defaultValue={task?.deadline}
                        className="input bg-white/20 text-white border-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                        type="number"
                        name="budget"
                        required
                        defaultValue={task?.budget}
                        placeholder="Budget"
                        className="input bg-white/20 text-white placeholder-white border-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Email (Disabled) */}
                <input
                    type="email"
                    value={user?.email || "no email"}
                    disabled
                    className="input bg-white/10 text-white cursor-not-allowed border border-white/20"
                />

                {/* Name (Disabled) */}
                <input
                    type="text"
                    value={user?.displayName || "Beluga"}
                    disabled
                    className="input bg-white/10 text-white cursor-not-allowed border border-white/20"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn bg-primary hover:bg-primary-focus text-white text-xl font-semibold rounded-lg mt-2"
                >
                    ✅ Update Task
                </button>
            </div>
        </form>
    );
};
export default UpdateTask;