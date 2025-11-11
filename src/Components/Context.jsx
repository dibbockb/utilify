import React, { createContext, useState } from 'react';
import { app } from '../../public/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);

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

    const signInWithPopup = (auth, provider)
        .then(result => {
            setUser(result.user)
            console.log(`sign in with popup successful`, result.user);
            return;
        })
        .catch(error => {
            console.log(`error`, error);

        })

    const value = {
        user, setUser, handleRegister, auth, signInWithPopup
    }



    return (
        <AuthContext value={value}> {children} </AuthContext>
    );
};


export default AuthProvider;