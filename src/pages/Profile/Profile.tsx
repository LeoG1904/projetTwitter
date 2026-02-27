import { Box } from "@mui/material";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileStats from "./ProfileStats/ProfileStats";
import ProfileFeed from "./ProfileFeed/ProfileFeed";
import "./Profile.scss";

export default function Profile() {
  const user = {
    name: "John Doe",
    username: "@johndoe",
    bio: "Just another developer",
    avatar: "https://i.pravatar.cc/150?img=12",
    tweets: 42,
    following: 120,
    followers: 98,
  };

  const handleFollow = () => {
    console.log("Follow / Unfollow clicked");
  };

  return (
    <Box className="profile">
      <ProfileHeader
        name={user.name}
        username={user.username}
        bio={user.bio}
        avatar={user.avatar}
        onFollow={handleFollow}
      />
      <ProfileStats
        tweets={user.tweets}
        following={user.following}
        followers={user.followers}
      />
      <ProfileFeed />
    </Box>
  );
}