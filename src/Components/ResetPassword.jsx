import React from 'react';
import { NavLink } from 'react-router';

const ResetPassword = () => {


    const handleForgetReset = (event) => {
        event.preventDefault();
        console.log(`clicked forget reset button`);

    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body flex justify-center items-center w-full">
                            <h1 className="text-4xl font-bold">Recovery</h1>
                            <form className="fieldset flex flex-col items-center">
                                <br />
                                <input type="email" className="input border rounded-2xl border-green-600" placeholder="Email" />
                                <input type="password" className="input border rounded-2xl border-green-600" placeholder="Username" />
                                <br />
                                <br />
                                <NavLink to={'/login'} className="link link-hover">Login</NavLink>
                                <NavLink to={'/register'} className="link link-hover">Register</NavLink>
                                <br />

                                <button onClick={handleForgetReset} className="border text-green-600 w-full h-10 rounded-4xl font-medium hover:bg-green-500 hover:text-white">Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;