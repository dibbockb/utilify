import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from './Context';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { app, provider } from '../../public/firebase';
import { getAuth } from 'firebase/auth';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const auth = getAuth(app);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const { handleRegister, user, setUser, signInWithPopup, MySwal } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/

    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const photoURLRef = useRef(null);
    const passwordRef = useRef(null);


    const handleGoogleButton = (event) => {
        event.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user)
                navigate('/home')
                MySwal.fire({
                    title: "Successfull",
                    icon: "success",
                    draggable: false,
                    timer: 1000,
                });
            }).catch((err) => {
                const errorCode = err.code
                const errorMessage = err.message
                console.log(`error`, errorCode, errorMessage);
            });
    }

    const handleRegisterButton = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
            setError('Email, Name and Password are required!');
            setLoading(false);
            MySwal.fire({
                icon: "error",
                title: "Please fill in all required fields",
                timer: 1500,
            });
            return;
        }

        if (!passRegex.test(password)) {
            setError('Please choose a stronger password!');
            setLoading(false);
            MySwal.fire({
                icon: "error",
                title: "Password must be at least 6 characters long and contain at least one uppercase and one lowercase letter.",
                timer: 5000,
            });
            return;
        }

        try {
            const result = await handleRegister(email, password);
            setUser(result);
            setLoading(false);

            MySwal.fire({
                title: "Successful!",
                icon: "success",
                draggable: false,
                timer: 1000,
            });

            setTimeout(() => {
                navigate('/home');
            }, 100);

        } catch (error) {
            setError(error.message);
            console.log("error", error);
            setLoading(false);
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong!",
                timer: 1500,
            });
        }
    };

    return (
        <Fade>
            <div className="hero bg-base-200 min-h-screen dark:bg-[#1a1a1a] dark:text-white">

                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body flex justify-center items-center w-full dark:bg-[#1a1a1a] ">
                            <h1 className="text-4xl font-bold">Register</h1>
                            <form className="fieldset flex flex-col items-center ">
                                <br />
                                <input ref={emailRef} name="email" type="email" className="input  rounded-2xl  dark:bg-[#1a1a1a] " placeholder="Email *" required />
                                <div className="flex justify-center items-center relative w-full mt-4">
                                    <input ref={passwordRef} name="password" type={showPassword ? 'text' : 'password'} className="input border rounded-2xl  dark:bg-[#1a1a1a] " placeholder="Password *" required />
                                    <button type="button"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                                        title={showPassword ? 'Hide password' : 'Show password'}>
                                        {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                                    </button>
                                </div>
                                <input ref={usernameRef} name="name" type="text" className="input  rounded-2xl  dark:bg-[#1a1a1a] " placeholder="Name" />
                                <input ref={photoURLRef} name="photoURL" type="password" className="input border rounded-2xl  dark:bg-[#1a1a1a] " placeholder="Photo URL" />
                                <br />
                                <NavLink to={'/resetpassword'} className="link link-hover">Forgot password?</NavLink>
                                <NavLink to={'/login'} className="link link-hover">Have an account? Login</NavLink>
                                <br />
                                <button onClick={handleGoogleButton} className=" text-green-600  w-full h-10 rounded-4xl font-medium hover:bg-green-500 hover:text-white mb-3 flex items-center justify-center gap-2 transition-all">
                                    <FcGoogle></FcGoogle>
                                    Login with Google
                                </button>
                                <button onClick={handleRegisterButton} className=" text-green-600 w-full h-10 rounded-4xl font-medium hover:bg-green-500 hover:text-white transition-all">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Register;