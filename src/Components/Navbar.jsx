import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from "./Context";
import { FaUserAlt } from "react-icons/fa";
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../public/firebase';
import { MdNightlight } from "react-icons/md";
const auth = getAuth(app);

const Navbar = () => {
    const { user, setUser, MySwal } = useContext(AuthContext);

    const toggleTheme = () => {
        const htmlElement = document.documentElement;
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'night' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        // Save preference to localStorage (optional)
        localStorage.setItem('theme', newTheme);
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const handleLogout = () => {
        return signOut(auth)
            .then(() => {
                MySwal.fire({
                    title: "Logged Out",
                    icon: "success",
                    timer: 1000,
                });
            })
            .catch(err => {
                console.error(err);
                MySwal.fire({
                    icon: "error",
                    title: "Logout Failed",
                    timer: 1500,
                });
            });
    };

    return (
        <div className="dark:text-white dark:bg-black">
            <div className="navbar-container navbar shadow-md h-15 w-full  ">
                <div className="flex-1 flex justify-around items-center h-15">

                    <Link to={'/'} className="gap-2 flex items-center justify-center">
                        <img className='w-[50px]' src="/logo.png" alt="logo" />
                        <p className="text-2xl font-bold">Utilify</p>
                    </Link>

                    <div className='nav-items-middle flex gap-5'>
                        <NavLink to={'/home'} className={'font-medium text-[1.125rem]'}>Home</NavLink>
                        <NavLink to={'/bills'} className={'font-medium text-[1.125rem]'}>Bills</NavLink>
                        {user && <NavLink to={'/mybills'} className={'font-medium text-[1.125rem]'}>My Bills</NavLink>}
                    </div>


                    <div className='nav-items-right flex gap-2.5 items-center'>

                        <div>
                            <button onClick={toggleTheme} className="btn-primary h-10 w-10 rounded-full flex justify-center flex-col items-center hover:bg-gray-400 hover:rotate-50 transition-all">
                                <MdNightlight className="h-5 w-5 "></MdNightlight>
                            </button>
                        </div>

                        {user ? (
                            <div className="dropdown dropdown-center dark:text-white">
                                <div tabIndex={0} role="button" className="avatar cursor-pointer ">
                                    <div className="w-10 h-10 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2 overflow-hidden">
                                        {user?.photoURL ? (
                                            <img src={user.photoURL} alt="user avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center bg-gray-200 w-full h-full">
                                                <FaUserAlt className="w-5 h-5 text-gray-600" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-1 menu p-3 shadow bg-green-100 dark:bg-black  rounded-box w-72 text-center items-center">
                                    <li><div className="font-medium">{user.email}</div></li>
                                    <li><NavLink to={'/mybills'} className="w-full">My Bills</NavLink></li>
                                    <li><button className="w-full text-left" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <NavLink
                                    to={'/login'}
                                    className=" font-medium text-[1.125rem]"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to={'/register'}
                                    className="font-medium text-[1.125rem]"
                                >
                                    Register
                                </NavLink>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;