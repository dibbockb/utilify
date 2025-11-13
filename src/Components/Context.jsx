import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { app } from '../../public/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const [loading, setLoading] = useState(true);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    //reg.usingbutton
    const handleRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user);
                return result.user;
            })
            .catch(error => {
                console.error("Error", error);
                throw error;
            });
    };

    //login.usingbutton
    const handleLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user);
                MySwal.fire({
                    title: "Successfull!",
                    icon: "success",
                    draggable: false,
                    timer: 1000,
                });
                return result.user;
            })
            .catch(error => {
                console.error("Error", error);
                MySwal.fire({
                    icon: "error",
                    title: "Wrong Credentials!",
                    timer: 1500,
                });
                throw error;
            });
    };

    const value = {
        user,
        setUser,
        handleRegister,
        handleLogin,
        auth,
        signInWithPopup,
        MySwal,
    };

    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;