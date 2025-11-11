import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from "./Context";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <>
            <div className="navbar-container navbar bg-base-100 shadow-sm h-15 w-full">
                <div className="flex-1 flex justify-around items-center h-15">

                    <Link to={'/'} className="gap-2 flex items-center justify-center">
                        <img className='w-[50px]' src="/logo.png" alt="logo" />
                        <p className="text-2xl font-bold">Utilify</p>
                    </Link>

                    <div className='nav-items-middle flex gap-5'>
                        <NavLink to={'/home'} className={'font-medium text-[1.125rem]'}>Home</NavLink>
                        <NavLink to={'/bills'} className={'font-medium text-[1.125rem]'}>Bills</NavLink>
                    </div>

                    <div className='nav-items-right flex gap-2.5 items-center'>
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="avatar cursor-pointer">
                                    <div className="w-9 h-9 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt="user avatar" />
                                        ) : (
                                            <div className="flex items-center justify-center bg-gray-300">
                                                <FaUserAlt className="w-5 h-5 text-gray-600" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>{user.email}</a></li>
                                    <li><NavLink to={'/mybills'}>My Bills</NavLink></li>
                                    <li><a onClick={handleLogout}>Logout</a></li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <NavLink to={'/login'} className={'font-medium text-[1.125rem]'}>Login</NavLink>
                                <NavLink to={'/register'} className={'font-medium text-[1.125rem]'}>Register</NavLink>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Navbar;