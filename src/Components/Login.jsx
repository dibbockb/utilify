import React, { useContext, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { AuthContext } from './Context';
import { app, provider } from '../../public/firebase';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
    const auth = getAuth(app);
    const { user, setUser, handleLogin, MySwal } = useContext(AuthContext);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const handleGoogleButton = (event) => {
        event.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                MySwal.fire({ title: "Logged in!", icon: "success", timer: 1000 });
                const from = location.state?.from?.pathname || '/home';
                navigate(from, { replace: true });
                return result.user;
            })
            .catch((err) => {
                console.error(err);
                MySwal.fire({ icon: "error", title: "Login failed", timer: 1500 });
            });
    };

    const handleLoginButton = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const loggedInUser = await handleLogin(email, password);
            setUser(loggedInUser);
            MySwal.fire({ title: "Logged in!", icon: "success", timer: 1000 });
            const from = location.state?.from?.pathname || '/home';
            navigate(from, { replace: true });
            return loggedInUser;
        } catch (err) {
            MySwal.fire({ icon: "error", title: "Login failed", text: err.message, timer: 2000 });
        }
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body flex justify-center items-center w-full">
                            <h1 className="text-4xl font-bold">Login</h1>

                            <form className="fieldset flex flex-col items-center">
                                <br />
                                <input ref={emailRef} type="email" className="input border rounded-2xl border-green-600" placeholder="Email *" requrired />

                                <div className="flex justify-center items-center relative w-full mt-4">

                                    <input ref={passwordRef} type={showPassword ? 'text' : 'password'} className="input border rounded-2xl border-green-600" placeholder="Password *" requrired />
                                    <button type="button"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                                        title={showPassword ? 'Hide password' : 'Show password'}>
                                        {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                                    </button>
                                </div>

                                <br />
                                <NavLink to={'/resetpassword'} className="link link-hover">Forgot password?</NavLink>
                                <NavLink to={'/register'} className="link link-hover">Create an account</NavLink>
                                <br />

                                <button onClick={handleGoogleButton} className="border text-green-600 border-green-600 w-full h-10 rounded-4xl font-medium hover:bg-green-500 hover:text-white mb-3 flex items-center justify-center gap-2">
                                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Login with Google
                                </button>
                                <button onClick={handleLoginButton} className="border text-green-600 w-full h-10 rounded-4xl font-medium hover:bg-green-500 hover:text-white">Login</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default Login;