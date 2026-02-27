import { Box, Typography } from "@mui/material";
import "./ProfileFeed.scss";

export default function ProfileFeed() {
  return (
    <Box className="profile__feed">
      <Typography variant="body2" color="textSecondary">
        User's tweets will appear here...
      </Typography>
    </Box>
  );
}