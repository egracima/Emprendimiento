import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authProvider";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Si NO está autenticado, redirige a login
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, muestra la ruta protegida
  return <Outlet />;
}