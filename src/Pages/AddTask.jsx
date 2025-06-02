import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import addTask from "../../public/Lottie/addTask.json";
import axios from "axios";

const AddTask = () => {
    const { user } = useContext(AuthContext);

    const handleAddTask = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const description = form.description.value;
        const deadline = form.deadline.value;
        const budget = form.budget.value;
        const email = user?.email || "no email";
        const name = user?.displayName || "beluga";

        const taskData = {
            title,
            category,
            description,
            deadline,
            budget,
            email,
            name
        };


        //Using Axios for better error handling and response management
        axios.post(`${import.meta.env.VITE_API_URL}/task`, taskData, {
            withCredentials: true,
        })
            .then(response => {
                if (response.data.acknowledged) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Task added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                }
            })
            .catch(error => {
                console.error("There was an error adding the task!", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while adding the task!'
                });
            });
    }


    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-center p-4">

            <form
                onSubmit={handleAddTask}
                className="w-full md:w-1/2 md:mx-auto  mt-10 p-8 rounded-xl backdrop-blur-md 
                bg-[url('/assets/addtask.jpeg')] bg-cover bg-center bg-no-repeat 
                border border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl"
            >
                <h2 className="text-3xl font-semibold text-center text-white mb-6">Add New Task</h2>


                <div className="flex flex-col space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        required
                        className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        name="category"
                        required
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
                        className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="date"
                        name="deadline"
                        required
                        className="px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        name="budget"
                        placeholder="Budget"
                        required
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
                        className="bg-[#4B0082]   btn text-2xl text-white font-semibold py-2 rounded-lg transition duration-200"
                    >
                        Add Task
                    </button>

                </div>
            </form>


            <div className="flex justify-center mt-10">
                <Lottie
                    animationData={addTask}
                    loop
                    className="w-96 h-96"
                />
            </div>

        </div>
    );
};

export default AddTask;