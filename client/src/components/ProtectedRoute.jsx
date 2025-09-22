import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (user === null) {
    // No user logged in
    return <Navigate to="/login" replace />;
  }

  // Force lowercase comparison
  const role = user.role.toLowerCase();
  const roles = allowedRoles?.map((r) => r.toLowerCase()) || [];

  if (!roles.includes(role)) {
    // User logged in but role not allowed
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;