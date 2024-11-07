import {createBrowserRouter} from "react-router-dom";
import PageNotFound from "./features/PageNotFound.jsx";
import RegisterPage from "./features/Auth/pages/RegisterPage.jsx";
import LoginPage from "./features/Auth/pages/LoginPage.jsx";
import HomePage from "./features/HomePage.jsx";
import PrivateRoute from "./shared/config/PrivateRoute.jsx";

export const router = createBrowserRouter([
    {
        errorElement: <PageNotFound/>,
        children: [
            {
                path: "/",
                element: (
                    <PrivateRoute>
                        <HomePage/>
                    </PrivateRoute>
                ),
            },
            {
                path: "/auth/login",
                element: <LoginPage/>,
            },
            {
                path: "/auth/register",
                element: <RegisterPage/>,
            },
        ],
    },
]);
