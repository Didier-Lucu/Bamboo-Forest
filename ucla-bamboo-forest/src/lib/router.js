import { createBrowserRouter } from "react-router-dom";
import Login from "components/Auth/Login";
import Register from "components/Auth/Register";
import Layout from "components/layout";
import Dashboard from "components/Auth/dashboard";
import Comments from "components/comments";
import Profile from "components/profile";
import USERS from "components/Users";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";
export const PROFILE = "/protected/profile/:id";
export const COMMENTS = "/protected/comments/:id";
export const ALLUSERS = "/protected/users";




export const router = createBrowserRouter([
    { path: ROOT, element: <Login /> },
    { path: LOGIN, element: <Login /> },
    { path: REGISTER, element: <Register /> },
    {
        path: PROTECTED, element: <Layout />, children: [
            { path: DASHBOARD, element: <Dashboard />, },
            { path: PROFILE, element: <Profile />, },
            { path: COMMENTS, element: <Comments />, },
            { path: ALLUSERS, element: <USERS />, },
        ]
    },

]);