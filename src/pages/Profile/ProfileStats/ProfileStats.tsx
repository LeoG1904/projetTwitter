import { Box, Typography } from "@mui/material";
import "./ProfileStats.scss";

interface ProfileStatsProps {
  tweets: number;
  following: number;
  followers: number;
}

export default function ProfileStats({ tweets, following, followers }: ProfileStatsProps) {
  return (
    <Box className="profile__stats">
      <Box className="profile__stat">
        <Typography variant="subtitle2" align="center">{tweets}</Typography>
        <Typography variant="caption">Tweets</Typography>
      </Box>
      <Box className="profile__stat">
        <Typography variant="subtitle2" align="center">{following}</Typography>
        <Typography variant="caption">Following</Typography>
      </Box>
      <Box className="profile__stat">
        <Typography variant="subtitle2" align="center">{followers}</Typography>
        <Typography variant="caption">Followers</Typography>
      </Box>
    </Box>
  );
}