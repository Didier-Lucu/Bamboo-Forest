import userEvent from "@testing-library/user-event";
import { LOGIN } from "lib/router";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/Auth";
import Navbar from "components/Navbar";

export default function Layout() {
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();

    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (pathname.startsWith("/protected") && !user) {
            navigate(LOGIN);
        }
    }, [pathname, user]);

    if (isLoading) {
        return "Loading..."
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}
