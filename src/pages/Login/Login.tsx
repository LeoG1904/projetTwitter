import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Link
} from "@mui/material";

import "./Login.scss";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ⚠️ Temporaire : pas de vraie auth
    navigate("/home");
  };

  const goToSignup = () => {
    navigate("/signup");
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

        {/* Footer : lien vers Signup */}
        <Box className="login__footer">
          <Typography variant="body2">
            Don’t have an account?{" "}
            <Link component="button" onClick={goToSignup}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}