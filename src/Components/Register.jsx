import React from 'react';
import { NavLink } from 'react-router';

const Register = () => {


    const handleGoogleButton = (event) => {
        event.preventDefault();
        console.log(`clicked google button`);
    }

    const handleRegisterButton = (event) => {
        event.preventDefault();
        console.log(`clicked register button`);
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">

                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body flex justify-center items-center w-full">
                            <h1 className="text-4xl font-bold">Register</h1>
                            <form className="fieldset flex flex-col items-center">
                                <br />
                                <input type="email" className="input border rounded-2xl border-green-600" placeholder="Email" required />
                                <input type="text" className="input border rounded-2xl border-green-600" placeholder="Name" required />
                                <input type="text" className="input border rounded-2xl border-green-600" placeholder="Photo URL" />
                                <input type="password" className="input border rounded-2xl border-green-600" placeholder="Password" required />
                                <br />
                                <NavLink to={'/resetpassword'} className="link link-hover">Forgot password?</NavLink>
                                <NavLink to={'/register'} className="link link-hover">Have an account? Login</NavLink>
                                <br />
                                <button onClick={handleGoogleButton} className="border text-green-600 border-green-600 w-full h-10 rounded-4xl font-medium hover:bg-green-500 hover:text-white mb-3 flex items-center justify-center gap-2">
                                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Login with Google
                                </button>
                                <button onClick={handleRegisterButton} className="border text-green-600 w-full h-10 rounded-4xl font-medium hover:bg-green-500 hover:text-white">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;