import { useState } from "react";
import { Box, Avatar, Button } from "@mui/material";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

interface ProfileHeaderProps {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  onFollow: () => void;
  onSave: (updatedUser: { name: string; bio: string }) => void;
}

export default function ProfileHeader({
  name,
  username,
  bio,
  avatar,
  onFollow,
  onSave,
}: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ name, bio });

  const handleChange = (field: "name" | "bio", value: string) => {
    setEditValues({ ...editValues, [field]: value });
  };

  const handleSave = () => {
    onSave(editValues);  // envoie uniquement nom + bio
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
        {isEditing ? (
          <>
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        ) : (
          <>
            <Button variant="outlined" onClick={onFollow}>Follow</Button>
            <Button variant="text" onClick={() => setIsEditing(true)}>Edit</Button>
          </>
        )}
      </Box>
    </Box>
  );
}