import React, { useContext, useState, useRef } from 'react';
import { Fade } from 'react-awesome-reveal';
import { AuthContext } from './Context';
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { app } from '../../public/firebase';
import { FaUserAlt, FaEnvelope, FaLock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { FaUserTag } from "react-icons/fa6";
import { useNavigate } from 'react-router';

const Profile = () => {
    const { user, MySwal } = useContext(AuthContext);
    const auth = getAuth(app);
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const nameRef = useRef(null);
    const photoRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newName = nameRef.current?.value || user.displayName;
        const newPhoto = photoRef.current?.value || user.photoURL;
        const newEmail = emailRef.current?.value || user.email;
        const newPassword = passwordRef.current?.value;

        try {
            await updateProfile(auth.currentUser, {
                displayName: newName,
                photoURL: newPhoto
            });

            if (newEmail !== user.email) {
                await updateEmail(auth.currentUser, newEmail);
            }

            if (newPassword && newPassword.length >= 8) {
                await updatePassword(auth.currentUser, newPassword);
            }

            MySwal.fire({
                title: 'Profile Update done!',
                icon: 'success',
                timer: 1500
            });
            setEditMode(false);

        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Failed!',
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fade>
            <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-[#1a1a1a] py-10 dark:text-white ">
                <div className="max-w-4xl w-full mx-4">
                    <div className="card bg-white dark:bg-[#00100B] shadow-2xl">
                        <div className="card-body">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-4xl font-bold dark:text-white">Profile</h2>
                                {!editMode && (
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="btn w-35 h-12 bg-[#58BA01] rounded-xl flex justify-center items-center text-xl"
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-col items-center ">
                                <div className="avatar">
                                    <div className="w-32 h-32 rounded-full ">
                                        {user?.photoURL ? (
                                            <img src={user.photoURL} alt="Profile" className="object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center bg-gray-200 w-full h-full">
                                                <FaUserAlt className="w-16 h-16 text-gray-600" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {!editMode ? (
                                <div className="gap-2 dark:text-white flex flex-col " >
                                    <div className="flex items-center gap-4 p-4 bg-base-200 dark:bg-[#1a1a1a] rounded-2xl ">
                                        <FaUserAlt className="text-2xl text-[#58BA01]" />
                                        <div>
                                            <p className="text-sm opacity-70">Display Name</p>
                                            <p className="text-xl font-medium">{user.displayName || 'Not set'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-base-200 dark:bg-[#1a1a1a] rounded-2xl">
                                        <FaEnvelope className="text-2xl text-[#58BA01]" />
                                        <div>
                                            <p className="text-sm opacity-70">Email</p>
                                            <p className="text-xl font-medium">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-base-200 dark:bg-[#1a1a1a] rounded-2xl">
                                        <FaLock className="text-2xl text-[#58BA01]" />
                                        <div>
                                            <p className="text-sm opacity-70"> Created on</p>
                                            <p className="text-xl font-medium">
                                                {new Date(user.metadata.creationTime).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-base-200 dark:bg-[#1a1a1a] rounded-2xl">
                                        <FaUserTag className="text-2xl text-[#58BA01]"></FaUserTag>
                                        <div className="w-full">
                                            <p className="text-sm opacity-70">User Unique ID</p>
                                            <p className="text-sm font-mono break-all">{user.uid}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSaveProfile} className="gap-4 flex flex-col text-center ">
                                    <div className="flex gap-5">
                                        <label className="label">
                                            <span className="text-xl">Display Name</span>
                                        </label>
                                        <input
                                            ref={nameRef}
                                            type="text"
                                            defaultValue={user.displayName || ''}
                                            className="input input-bordered rounded-2xl dark:bg-[#1a1a1a] dark:text-white"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div className="flex gap-5">
                                        <label className="label">
                                            <span className="text-xl">Photo URL</span>
                                        </label>
                                        <input
                                            ref={photoRef}
                                            type="url"
                                            defaultValue={user.photoURL || ''}
                                            className="input input-bordered rounded-2xl dark:bg-[#1a1a1a] dark:text-white"
                                            placeholder="https://example.com/photo.jpg"
                                        />
                                    </div>

                                    <div className="flex gap-5">
                                        <label className="label">
                                            <span className="text-xl">Email</span>
                                        </label>
                                        <input
                                            ref={emailRef}
                                            type="email"
                                            defaultValue={user.email}
                                            className="input input-bordered rounded-2xl dark:bg-[#1a1a1a] dark:text-white"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div className="flex gap-5">
                                        <label className="label">
                                            <span className="text-xl">New Password</span>
                                        </label>
                                        <input
                                            ref={passwordRef}
                                            type="password"
                                            className="input input-bordered rounded-2xl dark:bg-[#1a1a1a] dark:text-white"
                                        />
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn bg-[#58BA01] border-0 hover:bg-[#58BA01]/80 rounded-2xl flex-1 gap-2 dark:text-white/90"
                                        >
                                            {loading ? (
                                                <span className="loading loading-spinner dark:text-white"></span>
                                            ) : (
                                                <>
                                                    <FaSave /> Save Changes
                                                </>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditMode(false)}
                                            className="btn bg-red-600/80 border-0 hover:bg-red-600/60 transition-all rounded-2xl gap-2 dark:text-white/90"
                                        >
                                            <FaTimes /> Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Profile;