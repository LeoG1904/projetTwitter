import { Box, Typography, TextField } from "@mui/material";
import "./ProfileInfo.scss";

interface ProfileInfoProps {
  isEditing: boolean;
  values: { name: string; bio: string; username: string };
  onChange?: (field: "name" | "bio", value: string) => void;
}

export default function ProfileInfo({ isEditing, values, onChange }: ProfileInfoProps) {
  return (
    <Box className="profile__info">
      {isEditing ? (
        <Box className="profile__edit-fields">
          <TextField
            label="Nom"
            value={values.name}
            onChange={(e) => onChange?.("name", e.target.value)}
            size="small"
            fullWidth
            className="profile__text-field"
          />
          <TextField
            label="Bio"
            value={values.bio}
            onChange={(e) => onChange?.("bio", e.target.value)}
            size="small"
            multiline
            fullWidth
            className="profile__text-field"
          />
        </Box>
      ) : (
        <Box className="profile__display">
          <Typography variant="h5" className="profile__name">
            {values.name}
          </Typography>
          <Typography variant="body2" className="profile__username">
            {values.username}
          </Typography>
          <Typography variant="body2" className="profile__bio">
            {values.bio}
          </Typography>
        </Box>
      )}
    </Box>
  );
}