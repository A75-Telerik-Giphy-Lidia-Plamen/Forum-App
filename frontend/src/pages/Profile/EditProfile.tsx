import { useParams, useNavigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import EditProfileForm from "../../components/profile/EditProfile/EditProfileForm";
import Loading from "../../components/ui/Loading";

export default function EditProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { profile, isLoading, error } = useProfile(id!);

  if (isLoading) return <Loading />;
  if (error || !profile) return <div>{error}</div>;

  return (
    <EditProfileForm
      profile={profile}
      onCancel={() => navigate(-1)}
    />
  );
}