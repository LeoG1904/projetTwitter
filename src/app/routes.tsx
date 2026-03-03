import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import MainLayout from "../ui/Layouts/MainLayout/MainLayout";
import Notifications from "../pages/Notifications/Notifications";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirection racine */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Routes protégées avec layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}