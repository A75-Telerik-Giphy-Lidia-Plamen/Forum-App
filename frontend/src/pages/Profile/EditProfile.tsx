import { useParams, useNavigate } from "react-router-dom";
import EditProfileForm from "../../components/profile/EditProfileForm";
import { useProfile } from "../../hooks/useProfile";

export default function EditProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { profile, isLoading, error } = useProfile(id!);

  if (isLoading) return <div>Loading...</div>;
  if (error || !profile) return <div>{error}</div>;

  return (
    <EditProfileForm
      profile={profile}
      onCancel={() => navigate(-1)}
    />
  );
}