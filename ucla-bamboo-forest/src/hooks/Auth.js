import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "lib/firebase";
import { useState } from "react";
import { DASHBOARD } from "lib/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
    const [authUser, isLoading, error] = useAuthState(auth);

    return {
        user: authUser,
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
            navigate(DASHBOARD);
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