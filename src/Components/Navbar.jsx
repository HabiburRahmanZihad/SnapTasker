import { useContext, useEffect, useState } from 'react';
import { RiMenu2Fill } from 'react-icons/ri';
import { FiSun, FiMoon } from "react-icons/fi";
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import Loading from './Loading';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
    const { user, loading } = useContext(AuthContext);
    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', currentTheme);
        document.documentElement.setAttribute('data-theme', currentTheme);
        const checkboxes = document.querySelectorAll('input.theme-toggle');
        checkboxes.forEach(checkbox => {
            checkbox.checked = currentTheme === 'dark';
        });
    }, [currentTheme]);

    const toggleTheme = () => {
        setCurrentTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    if (loading) {
        return <Loading />;
    }

    const photoURL = user
        ? user.photoURL ||
        (user.providerData && user.providerData[0]?.photoURL) ||
        'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp'
        : 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp';

    const links = (
        <div className="flex flex-col lg:flex-row gap-2">
            <NavLink to="/">
                {({ isActive }) => (
                    <p className={`px-4 py-1 border-2 border-primary text-primary text-xl rounded-md hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
                        Home
                    </p>
                )}
            </NavLink>
            <NavLink to="/browseTasks">
                {({ isActive }) => (
                    <p className={`px-4 py-1 border-2 border-primary text-primary text-xl rounded-md hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
                        Browse Tasks
                    </p>
                )}
            </NavLink>

            {user && (
                <>
                    <NavLink to="/addtask">
                        {({ isActive }) => (
                            <p className={`px-4 py-1 border-2 border-primary text-primary text-xl rounded-md hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
                                Add Task
                            </p>
                        )}
                    </NavLink>
                    <NavLink to="/postedTasks">
                        {({ isActive }) => (
                            <p className={`px-4 py-1 border-2 border-primary text-primary text-xl rounded-md hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
                                My Posted Tasks
                            </p>
                        )}
                    </NavLink>
                    <NavLink to="/myApplications">
                        {({ isActive }) => (
                            <p className={`px-4 py-1 border-2 border-primary text-primary text-xl rounded-md hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
                                My Applications
                            </p>
                        )}
                    </NavLink>
                    <NavLink to="/mydashboard">
                        {({ isActive }) => (
                            <p className={`px-4 py-1 border-2 border-primary text-primary text-xl rounded-md hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
                                Dashboard
                            </p>
                        )}
                    </NavLink>
                </>
            )}
        </div>
    );


    return (
        <div className="bg-base-100 text-base-content lg:sticky top-0 z-50">
            <div className="navbar bg-base-100 shadow">
                {/* Left Section */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="lg:hidden">
                            <RiMenu2Fill size={25} />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>
                    <Link to={"/"}>
                        <img
                            className="w-70 shrink-0"
                            src="/assets/Logo2.png"
                            alt="logo"
                        />
                    </Link>
                </div>

                {/* Center Section */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-2">{links}</ul>
                </div>

                {/* Right Section */}
                <div className="navbar-end space-x-2">
                    {user ? (
                        <>
                            <Tooltip id="my-tooltip" />
                            <Link to={"/userDetails"} className="avatar">
                                <div
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={
                                        user.displayName || user.email
                                    }
                                    data-tooltip-place="bottom"
                                    className="w-10 lg:w-15 shrink-0 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-2"
                                >
                                    <img src={photoURL} alt="user avatar" />
                                </div>
                            </Link>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2"
                                aria-label="Toggle Theme"
                            >
                                {currentTheme === "dark" ? (
                                    <FiSun className="h-6 w-6 text-accent" />
                                ) : (
                                    <FiMoon className="h-6 w-6 text-accent" />
                                )}
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/signin">
                                {({ isActive }) => (
                                    <p
                                        className={`px-4 py-1 text-xl border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white ${isActive
                                            ? "bg-primary text-white"
                                            : ""
                                            }`}
                                    >
                                        SignIn
                                    </p>
                                )}
                            </NavLink>

                            <NavLink to="/signup">
                                {({ isActive }) => (
                                    <p
                                        className={`px-4 py-1 text-xl border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white hidden lg:flex ${isActive
                                            ? "bg-primary text-white"
                                            : ""
                                            }`}
                                    >
                                        SignUp
                                    </p>
                                )}
                            </NavLink>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2"
                                aria-label="Toggle Theme"
                            >
                                {currentTheme === "dark" ? (
                                    <FiSun className="h-6 w-6 text-accent" />
                                ) : (
                                    <FiMoon className="h-6 w-6 text-accent" />
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;