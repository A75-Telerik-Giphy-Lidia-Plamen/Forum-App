import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Loading from "../components/ui/Loading";
import { useEffect } from "react";

export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const location = useLocation();

  useEffect(() => {
    
  });

  if (loading) {
    return <Loading />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}