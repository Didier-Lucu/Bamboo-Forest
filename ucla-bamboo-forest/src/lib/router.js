import { createBrowserRouter } from "react-router-dom";
import Login from "components/Auth/Login";
import Register from "components/Auth/Register";
import Layout from "components/layout";

export const ROOT = "/"
export const LOGIN = "/login"
export const REGISTER = "/register"

export const PROTECTED = "/protected"
export const DASHBOARD = "/protected/dashboard"


export const router = createBrowserRouter([
    { path: ROOT, element: <Login /> },
    { path: LOGIN, element: <Login /> },
    { path: REGISTER, element: <Register /> },
    {
        path: PROTECTED, element: <Layout />, children: [
            { path: DASHBOARD, element: "This is the dashboard" },
        ]
    },

])