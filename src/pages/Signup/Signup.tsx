import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
  Alert,
  CircularProgress
} from "@mui/material";

import "./Signup.scss";
import { register } from "../../domains/auth/slice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  // ✅ State local
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLocalError(null);

    // ✅ Vérification password
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    const result = await dispatch(
      register({ username, email, password })
    );

    if (register.fulfilled.match(result)) {
      navigate("/login");
    }
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
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* ✅ Erreur locale (password mismatch) */}
          {localError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {localError}
            </Alert>
          )}

          {/* ✅ Erreur backend */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            className="signup__button"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

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