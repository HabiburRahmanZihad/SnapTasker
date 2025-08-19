import { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { AuthContext } from "./AuthContext";
import axios from "axios";




const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signOutUser = () => {
        return signOut(auth);
    };

    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    };

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const loginGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const loginGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser?.email) {

                const userData = { email: currentUser.email };

                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, userData, {
                    withCredentials: true,
                })
                    .then(() => {
                        // console.log('token after jwt', res.data);
                    })
                    .catch(err => {
                        console.error('JWT Error:', err);
                    });
            }

            // console.log('user in auth provider', currentUser);
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const userInfo = {
        user,
        setUser,
        loading,
        createUser,
        signInUser,
        signOutUser,
        forgetPassword,
        updateUserProfile,
        loginGoogle,
        loginGithub,
    };

    return (
        <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;