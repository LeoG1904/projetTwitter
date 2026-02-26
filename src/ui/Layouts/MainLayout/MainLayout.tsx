import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../../Sidebar/Sidebar";

import "./MainLayout.scss";

export default function MainLayout() {
  return (
    <Box className="layout">
      <Sidebar />

      <Box className="layout__content">
        <Outlet />
      </Box>
    </Box>
  );
}