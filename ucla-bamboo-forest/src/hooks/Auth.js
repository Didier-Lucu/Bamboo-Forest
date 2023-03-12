import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "lib/firebase";
import { useEffect, useState } from "react";
import { DASHBOARD, LOGIN } from "lib/router";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import isUserNameExists from "utils/userNameExist";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export function useAuth() {
    const [authUser, authenticating, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const ref = doc(db, "users", authUser.uid);
            const docSnapShot = await getDoc(ref);
            setLoading(false);
            setUser(docSnapShot.data());
        }

        if (!authenticating) {
            if (authUser) {
                fetchData();
            }
            else {
                setLoading(false)
            }
        }
    }, [authenticating]);

    return {
        user,
        isLoading,
        error
    };
}

export function useLogin() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    async function login({ email, password, redirectTo = DASHBOARD }) {
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: "Logged in successfully",
                status: "success",
                duration: 3000,
                position: "top",
                isClosable: true,
            });
            navigate(redirectTo);
        }
        catch (error) {
            toast({
                title: "Error logging in",
                description: error.message,
                status: "error",
                duration: 3000,
                position: "top",
                isClosable: true,
            });
            setLoading(false);
            return false;
        }
        setLoading(false);
        return true;
    }

    return { login, isLoading };
}

export function useSocialLogin() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const randomName = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals]
    });


    async function socialLogin({ redirectTo = DASHBOARD, providerType }) {
        setLoading(true);

        let provider;
        if (providerType === "google") {
            provider = new GoogleAuthProvider();
        } else {
            throw new Error(`Unsupported provider type: ${providerType}`);
        }

        try {
            const result = await signInWithPopup(auth, provider);

            // Check if the user already exists in the "users" collection
            const userRef = doc(db, "users", result.user.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                // Create a new entry for the user in the "users" collection
                await setDoc(userRef, {
                    id: result.user.uid,
                    username: randomName,
                    profilePhoto: "",
                    date: Date.now(),
                });
            }

            toast({
                title: "Logged in successfully",
                status: "success",
                duration: 3000,
                position: "top",
                isClosable: true,
            });
            navigate(redirectTo);
        } catch (error) {
            toast({
                title: "Error logging in",
                description: error.message,
                status: "error",
                duration: 3000,
                position: "top",
                isClosable: true,
            });
            setLoading(false);
            return false;
        }
        setLoading(false);
        return true;
    }

    return { socialLogin, isLoading };
}


export function useLogOut() {
    const [signOut, isLoading, error] = useSignOut(auth);
    const navigate = useNavigate();
    const toast = useToast();

    async function logout() {
        if (await signOut()) {
            toast({
                title: "Logged out successfully",
                status: "success",
                duration: 3000,
                position: "top",
                isClosable: true,
            });
            navigate(LOGIN);
        }
        else {
            toast({
                title: "Error logging out",
                description: error.message,
                status: "error",
                duration: 3000,
                position: "top",
                isClosable: true,
            });
        }

    }
    return { logout, isLoading };
}

export function useRegister() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    async function register({ username, email, password, redirectTo = DASHBOARD }) {
        setLoading(true);

        const usernameExists = await isUserNameExists(username)

        if (usernameExists) {
            toast({
                title: "Username already exists",
                status: "error",
                duration: 3000,
                position: "top",
                isClosable: true,
            });
            setLoading(false);
        }
        else {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password); //gives back a user object

                await setDoc(doc(db, "users", res.user.uid), {
                    id: res.user.uid,
                    username: username.toLowerCase(),
                    profilePhoto: "",
                    date: Date.now(),
                });

                toast({
                    title: "Account created successfully",
                    description: "Now logging you in...",
                    status: "success",
                    duration: 3000,
                    position: "top",
                    isClosable: true,
                });
                navigate(redirectTo);
            }
            catch (error) {
                toast({
                    title: "Error creating account",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    position: "top",
                    isClosable: true,
                });
            }
            finally {
                setLoading(false);
            }
        }
    }
    return { register, isLoading };
}