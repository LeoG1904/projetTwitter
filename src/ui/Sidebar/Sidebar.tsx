import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { logout } from "../../domains/auth/slice";

import "./Sidebar.scss";

interface SidebarProps {
  notificationCount?: number;
}

export default function Sidebar({ notificationCount = 0 }: SidebarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state: RootState) => state.user.profile);

  const profileLink = currentUser ? `/profile/${currentUser.id}` : "/profile";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box className="sidebar">
      <Typography variant="h5" className="sidebar__logo">
        Twitter
      </Typography>

      <List className="sidebar__nav">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </NavLink>

        <NavLink
          to={profileLink}
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItemButton>
        </NavLink>
      </List>

      <Box className="sidebar__logout">
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
}