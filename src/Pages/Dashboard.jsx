import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Link } from "react-router";
import { FaTasks, FaClipboardList, FaPaperPlane, FaEye, FaUserCircle } from "react-icons/fa";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalTasks: 0, myPosted: 0, myApplications: 0 });
    const [recentTasks, setRecentTasks] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`${import.meta.env.VITE_API_URL}/task`)
            .then(res => res.json())
            .then(t => setStats(prev => ({ ...prev, totalTasks: t.length })));

        fetch(`${import.meta.env.VITE_API_URL}/task?email=${user.email}`)
            .then(res => res.json())
            .then(t => setStats(prev => ({ ...prev, myPosted: t.length })));

        fetch(`${import.meta.env.VITE_API_URL}/applications?email=${user.email}`, { credentials: "include" })
            .then(res => res.json())
            .then(a => setStats(prev => ({ ...prev, myApplications: a.length })));

        fetch(`${import.meta.env.VITE_API_URL}/recentTasks`)
            .then(res => res.json())
            .then(rt => setRecentTasks(rt));
    }, [user]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10 space-y-10">
            <h1 className="text-4xl font-extrabold text-purple-800 drop-shadow-lg">
                Welcome, {user?.displayName || "User"}!
            </h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Total Tasks", value: stats.totalTasks, icon: <FaTasks /> },
                    { title: "Posted Tasks", value: stats.myPosted, icon: <FaClipboardList />, link: "/postedTasks" },
                    { title: "My Applications", value: stats.myApplications, icon: <FaPaperPlane />, link: "/myApplications" },
                ].map((card, i) => (
                    <Link
                        key={i}
                        to={card.link || "#"}
                        className="relative bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition p-6 flex items-center space-x-4"
                    >
                        <div className="text-purple-700 text-4xl">{card.icon}</div>
                        <div>
                            <p className="text-gray-600 font-medium">{card.title}</p>
                            <p className="text-3xl font-bold text-purple-800">{card.value}</p>
                        </div>
                        {card.link && <span className="absolute top-4 right-4 text-purple-600 text-xl">→</span>}
                    </Link>
                ))}
            </div>

            {/* Recent Tasks */}
            <section>
                <h2 className="text-2xl font-semibold text-purple-800 mb-4">Upcoming Tasks</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentTasks.map(task => (
                        <Link
                            key={task._id}
                            to={`/taskDetails/${task._id}`}
                            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition p-5 space-y-2"
                        >
                            <h3 className="font-bold text-lg text-purple-800">{task.title}</h3>
                            <p className="text-gray-600">Category: {task.category}</p>
                            <p className="text-gray-600">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                        </Link>
                    ))}
                </div>
                <div className="mt-4 text-right">
                    <Link to="/browseTasks" className="inline-flex items-center text-purple-700 hover:text-purple-900 font-medium">
                        View All Tasks <FaEye className="ml-1" />
                    </Link>
                </div>
            </section>

            {/* Quick Action Cards */}
            <section>
                <h2 className="text-2xl font-semibold text-purple-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { to: "/", label: "Home", icon: <FaUserCircle /> },
                        { to: "/addtask", label: "Add Task", icon: <FaClipboardList /> },
                        { to: "/browseTasks", label: "Browse Tasks", icon: <FaTasks /> },
                        { to: "/userDetails", label: "Profile", icon: <FaUserCircle /> },
                    ].map(item => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition p-6 flex flex-col items-center space-y-2"
                        >
                            <div className="text-purple-700 text-4xl">{item.icon}</div>
                            <span className="text-purple-800 font-medium">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;