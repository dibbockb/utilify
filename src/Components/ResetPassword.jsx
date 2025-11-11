import React, { useRef } from 'react';
import { NavLink } from 'react-router';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from '../../public/firebase';

const ResetPassword = () => {

    const emailRef = useRef(null);
    const auth = getAuth(app);

    const handleForgetReset = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        console.log(`clicked forget reset button ++ ${email}`);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log(`sent mail to , ${email}`);
            }).catch((err) => {
                console.log(err);
            });
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
                                <input ref={emailRef} type="email" className="input border rounded-2xl border-green-600" placeholder="Email" />
                                <br />
                                <NavLink to={'/login'} className="link link-hover">Login</NavLink>
                                <NavLink to={'/register'} className="link link-hover">Register</NavLink>
                                <br />

                                <button onClick={handleForgetReset} className="border text-green-600 w-full h-10 rounded-4xl font-medium hover:bg-green-500 hover:text-white">Send Mail</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;