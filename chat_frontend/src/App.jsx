import React from "react";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import FastChat from "./pages/ChatPage";
import { ThemeProvider } from "./components/ThemeSwitch/ThemeContext";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/userFunctions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { Toaster } from "sonner";

const App = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.authUser);
  const isCheckingAuth = useSelector((state) => state.user.isCheckingAuth);

  useEffect(() => {
    checkAuth(dispatch);
  }, [dispatch]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={authUser ? <Navigate to="/chat" /> : <HomePage />}
        />
        <Route
          path="/chat"
          element={
            authUser ? (
              <ThemeProvider>
                <FastChat />
              </ThemeProvider>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            authUser ? (
              <ThemeProvider>
                <ProfilePage />
              </ThemeProvider>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />

      <Toaster position="top-center" />
    </>
  );
};

export default App;
