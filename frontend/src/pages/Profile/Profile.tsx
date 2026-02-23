import { Navigate, useParams } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import ProfileAbout from "../../components/profile/ProfileAbout";

export default function Profile() {
  const { id } = useParams<{ id: string }>();

  const { profile, isLoading, error } = useProfile(id ?? "");

  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="p-8 text-sm text-zinc-500 dark:text-zinc-400">
        Loading profile...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="p-8 text-sm text-red-500">
        Profile not found.
      </div>
    );
  }

  return (
      <ProfileAbout {...profile} />
  );
}
