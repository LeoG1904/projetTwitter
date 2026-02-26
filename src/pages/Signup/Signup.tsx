import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Link
} from "@mui/material";

import "./Signup.scss";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ⚠️ Temporaire : pas de vraie création de compte
    navigate("/home");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <Box className="signup">
      <Paper elevation={3} className="signup__card">
        <Typography variant="h4" className="signup__title">
          Create your account
        </Typography>

        <form onSubmit={handleSubmit} className="signup__form">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
          />

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

          <TextField
            label="Confirm Password"
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
            className="signup__button"
          >
            Sign Up
          </Button>
        </form>

        {/* Lien vers Login */}
        <Box className="signup__footer">
          <Typography variant="body2">
            Already have an account?{" "}
            <Link component="button" onClick={goToLogin}>
              Log in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}