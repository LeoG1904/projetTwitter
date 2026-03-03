import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./app/routes";
import { loadUser } from "./domains/users/slice"; // <-- userSlice, pas authSlice
import type { AppDispatch } from "./app/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUser()); // charge automatiquement le user depuis le token
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;