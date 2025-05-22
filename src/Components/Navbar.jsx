import { useContext, useEffect, useState } from 'react';
import { RiMenu2Fill } from 'react-icons/ri';
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
            <NavLink to="/addtask">
                {({ isActive }) => (
                    <p className={`px-4 py-1 border-2 border-primary text-primary text-xl rounded-md hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
                        Add Task
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
            <NavLink to="/postedTasks">
                {({ isActive }) => (
                    <p className={`px-4 py-1 border-2 border-primary text-primary text-xl rounded-md hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
                        My Posted Tasks
                    </p>
                )}
            </NavLink>
        </div>
    );

    return (
        <div className=" bg-base-100 text-base-content lg:sticky top-0 z-50">
            <div className="navbar bg-base-100 shadow">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="lg:hidden">
                            <RiMenu2Fill size={25} />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to={'/'}><img className='w-70 shrink-0' src="/assets/Logo2.png" alt="logo" /></Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-2">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end space-x-2">
                    {user ? (
                        <>
                            <Tooltip id="my-tooltip" />
                            <Link to={'/userDetails'} className="avatar">
                                <div
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={user.displayName || user.email}
                                    data-tooltip-place="bottom"
                                    className="w-10 lg:w-15 shrink-0 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-2">
                                    <img src={photoURL} alt="user avatar" />
                                </div>
                            </Link>
                            <label className="swap swap-rotate lg:p-2  rounded-full ring ring-[#4B0082] ring-offset-base-100 ring-offset-2">
                                {/* this hidden checkbox controls the state */}
                                <input
                                    type="checkbox"
                                    className="theme-toggle"
                                    onChange={toggleTheme}
                                    checked={currentTheme === 'dark'}
                                />

                                {/* sun icon */}
                                <svg
                                    className="swap-on h-10 w-10 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>

                                {/* moon icon */}
                                <svg
                                    className="swap-off h-10 w-10 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>
                        </>
                    ) : (
                        <>
                            <NavLink to="/signin">
                                {({ isActive }) => (
                                    <p className={`px-4 py-1 text-xl border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
                                        SignIn
                                    </p>
                                )}
                            </NavLink>

                            <NavLink to="/signup">
                                {({ isActive }) => (
                                    <p className={`px-4 py-1 text-xl border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white hidden lg:flex ${isActive ? 'bg-primary text-white' : ''}`}>
                                        SignUp
                                    </p>
                                )}
                            </NavLink>

                            <label className="swap swap-rotate  rounded-full ring ring-[#4B0082] ring-offset-base-100 ring-offset-2">
                                {/* this hidden checkbox controls the state */}
                                <input
                                    type="checkbox"
                                    className="theme-toggle"
                                    onChange={toggleTheme}
                                    checked={currentTheme === 'dark'}
                                />

                                {/* sun icon */}
                                <svg
                                    className="swap-on h-10 w-10 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>

                                {/* moon icon */}
                                <svg
                                    className="swap-off h-10 w-10 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Navbar;