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

import "./Login.scss";
import { login } from "../../domains/auth/slice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { loadUser } from "../../domains/users/slice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  // ✅ State local pour le formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const result = await dispatch(login({ email, password }));

  if (login.fulfilled.match(result)) {
    await dispatch(loadUser());
    navigate("/home");
  }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          {/* ✅ Affichage erreur */}
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
            className="login__button"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>

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