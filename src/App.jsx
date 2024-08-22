import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import LandingPageLayout from "./layouts/LandingPageLayout";
import Dashboard from "./Pages/Dashboard";
import Main from "./Pages/Main";
import Account from "./Pages/Account";
import Video from "./Pages/Video";
import Authors from "./Pages/Authors";
import Category from "./Pages/Category";
import Sms from "./Pages/Sms";
import GiftCard from "./Pages/GiftCard";
import Subscription from "./Pages/Subscription";
import Login from "./layouts/LogIn";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { store } from "./Components/db/Redux/api/store";
import GetOneVideo from "./Pages/Video/components/GetOneVideo";

function App() {
  // const refToken = store.getState().refreshToken;
  // const refresh = useRefreshToken();

  // useEffect(() => {
  //   useRefreshToken();
  // }, [refToken]);

  const ProtectedRoute = ({ children }) => {
    // const isLoggedIn = useSelector((state) => state.auth.user == null);
    const isLoggedIn = localStorage.getItem("token") == "";

    if (!isLoggedIn) {
      return <Navigate to="/login" replace />; // Redirect to login on unauthorized access
    }

    return children; // Render child component if logged in
  };
  const router = createBrowserRouter([
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    {
      path: "/",
      element: (
        // <ProtectedRoute>
        //   <LandingPageLayout />
        // </ProtectedRoute>
        <LandingPageLayout />
      ),
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/category",
          element: <Category />,
        },
        {
          path: "/authors",
          element: <Authors />,
        },
        {
          path: "/sms",
          element: <Sms />,
        },
        {
          path: "/video",
          element: <Video />,
        },
        {
          path: "/videos/:id",
          element: <GetOneVideo />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/gift-cards",
          element: <GiftCard />,
        },
        {
          path: "/subscription",
          element: <Subscription />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} style={{ minHeight: "100vh" }} />;
}

export default App;
