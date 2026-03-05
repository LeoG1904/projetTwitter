import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchUserTweetsThunk } from "../../domains/tweets/slice";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileStats from "./ProfileStats/ProfileStats";
import ProfileFeed from "./ProfileFeed/ProfileFeed";
import { fetchUserById, updateProfile } from "../../domains/users/service";
import { setUserProfile } from "../../domains/users/slice";
import type { RootState } from "../../app/store";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import type { UserProfile } from "../../domains/users/types";
import "./Profile.scss";

export default function Profile() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>(); // 🔹 récupérer l'id depuis l'URL
  const currentUser = useSelector((state: RootState) => state.user.profile);
  const { tweets } = useSelector((state: RootState) => state.tweets);
  const token = localStorage.getItem("token") || "";

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = currentUser?.id === Number(id);

  // 🔹 Charger les infos du user (soit connecté soit autre profil)
  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;
      setLoading(true);
      try {
        if (isOwnProfile && currentUser) {
          setUser(currentUser);
        } else {
          const userData = await fetchUserById(token, Number(id));
          setUser(userData);
        }
      } catch (err) {
        console.error("Error loading user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, currentUser, isOwnProfile, token]);

  // 🔹 Charger les tweets de ce user
  useEffect(() => {
    if (user && token) {
      dispatch(fetchUserTweetsThunk({ userId: user.id, token }));
    }
  }, [user, token, dispatch]);

  const userTweets = tweets.filter(tweet => user ? tweet.owner.id === user.id : false);

  const handleSave = async (updatedUser: { name?: string; bio?: string }) => {
    if (!user) return;
    try {
      const savedUser = await updateProfile(token, updatedUser);
      dispatch(setUserProfile(savedUser));
      setUser(savedUser);
    } catch (err) {
      console.error("Erreur update profil :", err);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Profile not found.</p>;

  return (
    <Box className="profile">
      <ProfileHeader
        name={user.name || user.username}
        username={`@${user.username}`}
        bio={user.bio || ""}
        avatar={user.avatar || ""}
        isOwnProfile={isOwnProfile} // 🔹 indique si c'est le profil du user connecté
        onFollow={() => console.log("Follow / Unfollow")}
        onSave={handleSave}
      />
      <ProfileStats
        tweets={userTweets.length || 0}
        following={user.following || 0}
        followers={user.followers || 0}
      />
      <ProfileFeed userId={user.id} currentUser={currentUser?.username || ""} />
    </Box>
  );
}