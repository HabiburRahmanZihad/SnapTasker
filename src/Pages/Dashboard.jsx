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
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/20 px-6 py-10 space-y-12">
            <h1 className="text-4xl font-extrabold text-primary drop-shadow-sm">
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
                        className="relative bg-base-100 border border-primary/20 shadow-md hover:shadow-xl rounded-2xl transition-all p-6 flex items-center space-x-4 hover:-translate-y-1"
                    >
                        <div className="text-primary text-4xl">{card.icon}</div>
                        <div>
                            <p className="text-base-content/70 font-medium">{card.title}</p>
                            <p className="text-3xl font-bold text-primary">{card.value}</p>
                        </div>
                        {card.link && (
                            <span className="absolute top-4 right-4 text-primary text-xl">→</span>
                        )}
                    </Link>
                ))}
            </div>

            {/* Upcoming Tasks */}
            <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">📅 Upcoming Tasks</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentTasks.map(task => (
                        <Link
                            key={task._id}
                            to={`/taskDetails/${task._id}`}
                            className="bg-base-100 border border-primary/10 shadow hover:shadow-md rounded-2xl p-5 transition-all hover:scale-[1.02]"
                        >
                            <h3 className="font-semibold text-lg text-primary">{task.title}</h3>
                            <p className="text-base-content/70">Category: {task.category}</p>
                            <p className="text-base-content/60">
                                Deadline: {new Date(task.deadline).toLocaleDateString()}
                            </p>
                        </Link>
                    ))}
                </div>
                <div className="mt-6 text-right">
                    <Link
                        to="/browseTasks"
                        className="inline-flex items-center text-primary hover:text-primary-focus font-medium"
                    >
                        View All Tasks <FaEye className="ml-2" />
                    </Link>
                </div>
            </section>

            {/* Quick Actions */}
            <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">⚡ Quick Actions</h2>
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
                            className="bg-base-100 border border-primary/10 rounded-2xl shadow hover:shadow-lg p-6 flex flex-col items-center space-y-2 transition-all hover:-translate-y-1"
                        >
                            <div className="text-primary text-4xl">{item.icon}</div>
                            <span className="text-primary font-semibold">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );

};

export default Dashboard;