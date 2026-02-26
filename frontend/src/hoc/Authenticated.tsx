import Loading from "../components/ui/Loading";
import { useUser } from "../hooks/useUser";
import { Navigate, useLocation } from "react-router";

export default function Authenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
