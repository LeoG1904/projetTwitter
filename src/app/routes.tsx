import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile/Profile";
import Notifications from "../pages/Notification";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import MainLayout from "../ui/Layouts/MainLayout/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Pages principales */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
        {/* Auth (sans protection pour l’instant) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Route inconnue → redirection vers home */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}