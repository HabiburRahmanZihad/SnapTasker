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

        fetch(`https://snap-tasker-server.vercel.app/task/${task._id}`, {
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
            className="max-w-lg mx-auto mt-10 p-8 rounded-xl backdrop-blur-md 
                bg-[url('/assets/updateTask.jpg')] bg-cover bg-center bg-no-repeat 
                border border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
            <h2 className="text-3xl font-semibold text-center text-white mb-6">Update Task</h2>

            <div className="flex flex-col space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    required
                    defaultValue={task?.title}
                    className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    name="category"
                    required
                    defaultValue={task?.category}
                    className="px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option className="bg-gray-600" value="">Select Category</option>
                    <option className="bg-gray-600" value="Web Development">Web Development</option>
                    <option className="bg-gray-600" value="Design">Design</option>
                    <option className="bg-gray-600" value="Writing">Writing</option>
                    <option className="bg-gray-600" value="Marketing">Marketing</option>
                </select>

                <textarea
                    name="description"
                    placeholder="Description"
                    required
                    rows="3"
                    defaultValue={task?.description}
                    className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="date"
                    name="deadline"
                    required
                    defaultValue={task?.deadline}
                    className="px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="number"
                    name="budget"
                    placeholder="Budget"
                    required
                    defaultValue={task?.budget}
                    className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="email"
                    value={user?.email || "no email"}
                    disabled
                    className="px-4 py-2 rounded-lg bg-white/10 text-white cursor-not-allowed"
                />

                <input
                    type="text"
                    value={user?.displayName || "beluga"}
                    disabled
                    className="px-4 py-2 rounded-lg bg-white/10 text-white cursor-not-allowed"
                />

                <button
                    type="submit"
                    className="bg-[#4B0082] btn text-2xl text-white font-semibold py-2 rounded-lg transition duration-200"
                >
                    Update Task
                </button>
            </div>
        </form>
    );
};
export default UpdateTask;