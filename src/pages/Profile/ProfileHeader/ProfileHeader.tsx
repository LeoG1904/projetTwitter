import { Box, Typography, Avatar, Button } from "@mui/material";
import "./ProfileHeader.scss";

interface ProfileHeaderProps {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  onFollow: () => void;
}

export default function ProfileHeader({
  name,
  username,
  bio,
  avatar,
  onFollow,
}: ProfileHeaderProps) {
  return (
    <Box className="profile__header">
      <Box className="profile__avatar-section">
        <Avatar src={avatar} className="profile__avatar" />
        <Box className="profile__info">
          <Typography variant="h5" className="profile__name">
            {name}
          </Typography>
          <Typography variant="body2" className="profile__username">
            {username}
          </Typography>
          <Typography variant="body2" className="profile__bio">
            {bio}
          </Typography>
        </Box>
      </Box>

      <Button
        variant="outlined"
        className="profile__follow-btn"
        onClick={onFollow}
      >
        Follow
      </Button>
    </Box>
  );
}