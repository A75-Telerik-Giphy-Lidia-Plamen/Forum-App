import { useUser } from "../../hooks/useUser";
import { profileAboutStyles as s } from "./profileAbout.styles";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileMeta } from "./ProfileMeta";
import { ProfileStats } from "./ProfileStats";
import { ProfileActions } from "./ProfileActions";
import type { Profile } from "../../types/Profile";


export default function ProfileAbout(profile: Profile) {
  const { user } = useUser();
  const isOwner = user?.id === profile.id;

  return (
    <div className={s.card}>
      <div className={s.header}>
        <div className={s.leftSection}>
          <ProfileAvatar
            avatarUrl={profile.avatar_url}
            username={profile.username}
          />

          <div>
            <ProfileMeta
              firstName={profile.first_name}
              lastName={profile.last_name}
              username={profile.username}
              bio={profile.bio}
            />

            <ProfileStats
              reputation={profile.reputation}
              createdAt={profile.created_at}
            />
          </div>
        </div>

        {isOwner && profile.id && <ProfileActions id={profile.id} />}
      </div>
    </div>
  );
}
