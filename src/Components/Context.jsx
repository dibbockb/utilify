import React, { createContext, useState } from 'react';
import { app, provider } from '../../public/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);

    //reg.usingbutton
    const handleRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user);
                console.log(`user set to`, result.user);
                return result;

            })
            .catch(error => {
                console.error("Error", error);
                throw error;
            });
    }

    //login.usingbutton
    const handleLogin = (email, password) => {
        console.log(`called handlelogin inside context.jsx`);
        console.log(email, password)
        return signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(`user logged in`, result.user);
                setUser(result.user);
            })
            .catch(error => {
                console.log(error);
            });

    }

    const value = {
        user,
        setUser,
        handleRegister,
        auth,
        signInWithPopup,
        handleLogin
    }

    return (
        <AuthContext value={value}> {children} </AuthContext>
    );
};
export default AuthProvider;