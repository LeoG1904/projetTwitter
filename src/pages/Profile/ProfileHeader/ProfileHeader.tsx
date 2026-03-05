import { useState, useEffect } from "react";
import { Box, Avatar, Button } from "@mui/material";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import type { FollowRequest } from "../../../domains/follow/types";
import { follow, unfollow, fetchIsFollowing } from "../../../domains/follow/slice";

interface ProfileHeaderProps {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  userId: number;        // id du profil affiché
  isOwnProfile: boolean;
  onSave?: (updatedUser: { name: string; bio: string }) => void; // 🔹 prop pour sauvegarder
}

export default function ProfileHeader({
  name,
  username,
  bio,
  avatar,
  userId,
  isOwnProfile,
  onSave,
}: ProfileHeaderProps) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const { isFollowingTarget, loading } = useAppSelector((state) => state.follow);

  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ name, bio });
  const [isFollowing, setIsFollowing] = useState(false);

  // 🔹 reset editValues quand props changent
  useEffect(() => setEditValues({ name, bio }), [name, bio]);

  // 🔹 fetch si currentUser suit ce profil
  useEffect(() => {
    if (!token) return;
    dispatch(fetchIsFollowing({ targetUserId: userId, token }));
  }, [userId, token, dispatch]);

  // 🔹 synchroniser le local state avec le store
  useEffect(() => {
    setIsFollowing(isFollowingTarget);
  }, [isFollowingTarget]);

  const handleChange = (field: "name" | "bio", value: string) => {
    setEditValues({ ...editValues, [field]: value });
  };

  const handleFollowToggle = async () => {
    if (!token) return;
    const request: FollowRequest = { targetUserId: userId };

    try {
      if (isFollowing) {
        const res = await dispatch(unfollow({ request, token })).unwrap();
        console.log(res.message);
        setIsFollowing(false);
      } else {
        const res = await dispatch(follow({ request, token })).unwrap();
        console.log(res.message);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("Follow/Unfollow error:", err);
    }
  };

  const handleSave = () => {
    onSave?.(editValues);  // 🔹 appelle le parent pour sauvegarder
    setIsEditing(false);
  };

  return (
    <Box className="profile__header">
      <Box className="profile__avatar-section">
        <Avatar src={avatar} className="profile__avatar" />
        <ProfileInfo
          isEditing={isEditing}
          values={{ ...editValues, username }}
          onChange={handleChange}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        {isOwnProfile ? (
          isEditing ? (
            <>
              <Button variant="contained" onClick={handleSave}>Save</Button>
              <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <Button variant="text" onClick={() => setIsEditing(true)}>Edit</Button>
          )
        ) : (
          <Button
            variant={isFollowing ? "contained" : "outlined"}
            color={isFollowing ? "secondary" : "primary"}
            onClick={handleFollowToggle}
            disabled={loading}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </Box>
    </Box>
  );
}