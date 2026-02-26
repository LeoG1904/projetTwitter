import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button
} from "@mui/material";

import "./Login.scss";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ⚠️ Temporaire (pas de vraie auth)
    navigate("/home");
  };

  return (
    <Box className="login">
      <Paper elevation={3} className="login__card">
        <Typography variant="h4" className="login__title">
          Sign in to Twitter
        </Typography>

        <form onSubmit={handleSubmit} className="login__form">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            className="login__button"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}