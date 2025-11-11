import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from './Context';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { app, provider } from '../../public/firebase';
import { getAuth } from 'firebase/auth';

const Register = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { handleRegister, user, setUser, signInWithPopup } = useContext(AuthContext)
    const navigate = useNavigate()
    const auth = getAuth(app);
    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const photoURLRef = useRef(null);
    const passwordRef = useRef(null);


    const handleGoogleButton = (event) => {
        event.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user)
                console.log(`google sign in done`, result.user);
                navigate('/home')

            }).catch((err) => {
                const errorCode = err.code
                const errorMessage = err.message
                console.log(`error`, errorCode, errorMessage);
            });
    }

    const handleRegisterButton = (event) => {
        event.preventDefault();
        setError(``);
        setLoading(true);

        const email = emailRef.current.value;
        const username = usernameRef.current.value;
        const photoURL = photoURLRef.current.value;
        const password = passwordRef.current.value;
        if (!email || !password) {
            setError(`Email, Name and Password are required!`)
            setLoading(false);
            console.log(error);
            return;
        }

        handleRegister(email, password)
            .then(result => {
                console.log(`Registration Complete`, result.user);
                setUser(user);
                navigate('/home')
            })
            .catch(error => {
                setError(error.message)
                console.log(`error`, error);
                setLoading(false)
            })
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
                                <input ref={emailRef} name="email" type="email" className="input border rounded-2xl border-green-600" placeholder="Email *" required />
                                <input ref={passwordRef} name="password" type="password" className="input border rounded-2xl border-green-600" placeholder="Password *" required />
                                <input ref={usernameRef} name="name" type="text" className="input border rounded-2xl border-green-600" placeholder="Name" />
                                <input ref={photoURLRef} name="photoURL" type="password" className="input border rounded-2xl border-green-600" placeholder="Photo URL" />
                                <br />
                                <NavLink to={'/resetpassword'} className="link link-hover">Forgot password?</NavLink>
                                <NavLink to={'/login'} className="link link-hover">Have an account? Login</NavLink>
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