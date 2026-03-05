import { useState, useEffect } from "react";
import { Box, Avatar, Button } from "@mui/material";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

interface ProfileHeaderProps {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  isOwnProfile: boolean; // 🔹 nouveau
  onFollow?: () => void;
  onSave?: (updatedUser: { name: string; bio: string }) => void;
}

export default function ProfileHeader({
  name,
  username,
  bio,
  avatar,
  isOwnProfile,
  onFollow,
  onSave,
}: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ name, bio });

  useEffect(() => {
    setEditValues({ name, bio }); // 🔹 reset si props changent
  }, [name, bio]);

  const handleChange = (field: "name" | "bio", value: string) => {
    setEditValues({ ...editValues, [field]: value });
  };

  const handleSave = () => {
    onSave?.(editValues);
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
          <Button variant="outlined" onClick={onFollow}>Follow</Button>
        )}
      </Box>
    </Box>
  );
}