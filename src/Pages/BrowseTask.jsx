import { BsFillInfoSquareFill } from "react-icons/bs";
import { Link, useLoaderData } from "react-router";

const BrowseTask = () => {
    const initialdata = useLoaderData();

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className="text-xl ">
                            <th>No</th>
                            <th>Task Title</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            initialdata.map((task, index) => <tr key={task._id} className="text-xl">
                                <th>{index + 1}</th>
                                <td>{task.title}</td>
                                <td>{task.category}</td>
                                <td><Link to={`/taskDetails/${task._id}`} className="btn btn-ghost text-xl "> Details <BsFillInfoSquareFill size={20} ></BsFillInfoSquareFill></Link></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BrowseTask;