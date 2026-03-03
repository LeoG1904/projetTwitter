import { Box } from "@mui/material";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileStats from "./ProfileStats/ProfileStats";
import ProfileFeed from "./ProfileFeed/ProfileFeed";
import "./Profile.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../hooks/hooks";
import { updateProfile } from "../../domains/users/service";
import { setUserProfile } from "../../domains/users/slice";

export default function Profile() {
  // ✅ récupérer le user depuis Redux
  const user = useSelector((state: RootState) => state.user.profile);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token") || "";

  const handleFollow = () => {
    console.log("Follow / Unfollow clicked");
  };
  const handleSave = async (updatedUser: any) => {
    try {
      const savedUser = await updateProfile(token, updatedUser); // 🔹 envoie à la BD via API
      dispatch(setUserProfile(savedUser)); // 🔹 met à jour Redux
    } catch (err) {
      console.error("Erreur update profil :", err);
    }
  };
  // si user non connecté, tu peux afficher un message ou rediriger
  if (!user) {
    return <p>Vous devez être connecté pour voir le profil.</p>;
  }

  return (
    <Box className="profile">
      <ProfileHeader
        name={user.name || user.username}
        username={`@${user.username}`}
        bio={user.bio || ""}
        avatar={user.avatar || ""}
        onFollow={() => console.log("Follow")}
        onSave={handleSave} // 🔹 callback pour sauvegarder dans la BD
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