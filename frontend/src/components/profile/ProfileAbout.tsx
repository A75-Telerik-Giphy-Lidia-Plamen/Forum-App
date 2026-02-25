import { useUser } from "../../hooks/useUser";
import { profileAboutStyles as s } from "./profileAbout.styles";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileMeta } from "./ProfileMeta";
import { ProfileStats } from "./ProfileStats";
import { ProfileActions } from "./ProfileActions";
import type { Profile } from "../../types/Profile";
import { BadgesSection } from "./ProfileBadges";
import { useEffect, useState } from "react";
import { getUserBadges } from "../../services/badges.service";
import type { Badge } from "../../types/Badge";

export default function ProfileAbout(profile: Profile) {
  const [badges, setBadges] = useState<Badge[]>([]);
  const { user } = useUser();
  const isOwner = user?.id === profile.id;

  useEffect(() => {
    async function load() {
      const data = await getUserBadges(profile.id);
      console.log(data);
      const normalized: Badge[] =
        data?.map((row) => ({
          awarded_at: row.awarded_at,
          badges: row.badges,
        })) ?? [];

      setBadges(normalized);
    }

    load();
  }, [profile.id]);

  return (
    <div className={s.page}>
      <div className={s.container}>
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
                <BadgesSection badges={badges} />
              </div>
            </div>

            {isOwner && profile.id && <ProfileActions id={profile.id} />}
          </div>
        </div>
      </div>
    </div>
  );
}
