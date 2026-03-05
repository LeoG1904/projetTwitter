import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useAppSelector } from "../../../hooks/hooks";
import Sidebar from "../../Sidebar/Sidebar";
import "./MainLayout.scss";

export default function MainLayout() {
  const notifications = useAppSelector((state) => state.notifications.notifications);

  const notificationCount = notifications.filter((n) => !n.isView).length;

  return (
    <Box className="layout">
      <Sidebar notificationCount={notificationCount} />

      <Box className="layout__content">
        <Outlet />
      </Box>
    </Box>
  );
}