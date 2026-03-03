import { Box } from "@mui/material";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileStats from "./ProfileStats/ProfileStats";
import ProfileFeed from "./ProfileFeed/ProfileFeed";
import "./Profile.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export default function Profile() {
  // ✅ récupérer le user depuis Redux
  const user = useSelector((state: RootState) => state.user.profile);

  const handleFollow = () => {
    console.log("Follow / Unfollow clicked");
  };

  // si user non connecté, tu peux afficher un message ou rediriger
  if (!user) {
    return <p>Vous devez être connecté pour voir le profil.</p>;
  }

  return (
    <Box className="profile">
      <ProfileHeader
        name={user.username}          // ou user.name si tu as ce champ
        username={`@${user.username}`}
        bio={user.bio || ""}          // si tu as un champ bio
        avatar={user.avatar || "https://i.pravatar.cc/150?img=12"} // fallback si pas d'avatar
        onFollow={handleFollow}
      />
      <ProfileStats
        tweets={user.tweets || 0}    // à adapter si tu stockes le nombre de tweets
        following={user.following || 0}
        followers={user.followers || 0}
      />
      <ProfileFeed/>
    </Box>
  );
}