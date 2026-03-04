import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchUserTweetsThunk } from "../../domains/tweets/slice";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileStats from "./ProfileStats/ProfileStats";
import ProfileFeed from "./ProfileFeed/ProfileFeed";
import { updateProfile } from "../../domains/users/service";
import { setUserProfile } from "../../domains/users/slice";
import type { RootState } from "../../app/store";
import { Box } from "@mui/material";
import "./Profile.scss";

export default function Profile() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.profile);
  const { tweets} = useSelector((state: RootState) => state.tweets);
  const token = localStorage.getItem("token") || "";

  // Charger les tweets dès que le user est disponible
  useEffect(() => {
    if (user?.id && token) {
      dispatch(fetchUserTweetsThunk({ userId: user.id, token }));
    }
  }, [user?.id, token, dispatch]); // attention : user?.id ici

  const handleSave = async (updatedUser: { name?: string; bio?: string }) => {
    try {
      const savedUser = await updateProfile(token, updatedUser);
      dispatch(setUserProfile(savedUser));
    } catch (err) {
      console.error("Erreur update profil :", err);
    }
  };

  if (!user) return <p>Vous devez être connecté pour voir le profil.</p>;

  return (
    <Box className="profile">
      <ProfileHeader
        name={user.name || user.username}
        username={`@${user.username}`}
        bio={user.bio || ""}
        avatar={user.avatar || ""}
        onFollow={() => console.log("Follow / Unfollow")}
        onSave={handleSave}
      />
      <ProfileStats
        tweets={tweets.filter(tweet => tweet.owner.id === user.id).length}
        following={user.following || 0}
        followers={user.followers || 0}
      />
      <ProfileFeed userId={user.id} currentUser={user.username} />
    </Box>
  );
}