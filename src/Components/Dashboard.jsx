import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router';
import { Fade } from 'react-awesome-reveal';
import { AuthContext } from './Context';
import { MdOutlinePayments } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const Dashboard = () => {

    const { user } = useContext(AuthContext)
    return (
        <Fade>
            <div className="min-h-screen bg-white dark:bg-[#1a1a1a] flex dark:text-white">
                <aside className=" min-h-screen w-85 bg-[#0f0f0f] p-6 pl-20 flex flex-col ">
                    <Link to={"/"} className="flex justify-center w-45 hover:scale-105 translate-all pb-5"><img src="/logo.png" alt="utilify-logo" className="h-15 w-15" /></Link>

                    <div className="flex flex-col justify-center items-start text-center">
                        <Link to="/dashboard" className="text-white text-4xl font-bold mb-20 pb-20">Dashboard</Link>
                    </div>

                    <div className="flex flex-col justify-center items-start ">
                        <Link
                            to="mybills"
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition text-2xl pb-3"
                        >
                            <MdOutlinePayments className="w-6 h-6"></MdOutlinePayments>
                            My Bills
                        </Link>
                        <Link
                            to={`profile/${user.email}`}
                            className="flex items-center gap-3 text-gray-300 hover:text-white transition text-2xl"
                        >
                            <FaUserAlt className="w-5 h-5 "></FaUserAlt>
                            Profile
                        </Link>
                    </div>


                </aside>

                <div className="flex-1 p-8">
                    <Outlet />
                </div>
            </div>
        </Fade>
    );
};

export default Dashboard;