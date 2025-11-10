import React from 'react';
import { Link, NavLink } from 'react-router';
import { RiUser5Fill } from "react-icons/ri";

const Navbar = () => {
    return (
        <>
            <div className="navbar-container navbar bg-base-100 shadow-sm h-15 w-full">
                <div className="flex-1 flex justify-around items-center h-15">

                    <Link to={'/'} className="gap-2 flex items-center justify-center">
                        <img className='w-[50px]' src="/logo.png" alt="" />
                        <p className="text-2xl font-bold"> Utilify</p>
                    </Link>

                    <div className='nav-items-middle flex gap-5 '>
                        <NavLink to={'/home'} className={'font-medium text-[1.125rem]'}>Home</NavLink>
                        <NavLink to={'/bills'} className={'font-medium text-[1.125rem]'}>Bills</NavLink>
                        {/* <NavLink to={'/userBills'} className={'font-medium text-[1.125rem]'}>My Bills</NavLink> */}
                    </div>

                    <div className='nav-items-right flex gap-2.5'>
                        <NavLink to={'/login'} className={'font-medium text-[1.125rem]'}>Login</NavLink>
                        <NavLink to={'/register'} className={'font-medium text-[1.125rem]'}>Register</NavLink>
                        {/* <NavLink to={'/userProfile'} ><RiUser5Fill className={'w-[1.875rem] h-[1.875rem] hover:border border-[50] rounded-3xl'}></RiUser5Fill></NavLink> */}

                    </div>

                </div>

            </div>
        </>
    );
};

export default Navbar;