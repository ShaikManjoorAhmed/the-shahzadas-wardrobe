import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  return children;
};