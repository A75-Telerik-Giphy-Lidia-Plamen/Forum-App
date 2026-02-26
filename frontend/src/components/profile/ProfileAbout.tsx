import { useUser } from "../../hooks/useUser";
import { profileAboutStyles as s } from "./profileAbout.styles";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileMeta } from "./ProfileMeta";
import { ProfileStats } from "./ProfileStats";
import { ProfileActions } from "./ProfileActions";
import type { Profile } from "../../types/Profile";
import { BadgesSection } from "./Badges/ProfileBadges";
import { useEffect, useState } from "react";
import { getUserBadges } from "../../services/badges.service";
import type { UserBadgeRow, BadgeRow } from "../../types/Badge";
import { getPostsByAuthor } from "../../services/post.service";
import type { Post } from "../../types/Post";
import ProfilePosts from "./ProfilePosts/ProfilePosts";


export default function ProfileAbout(profile: Profile) {
  const [badges, setBadges] = useState<UserBadgeRow[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useUser();
  const isOwner = user?.id === profile.id;

  useEffect(() => {
    async function load() {
      const data = await getUserBadges(profile.id);
      const postsData = await getPostsByAuthor(profile.id);
      setBadges(data ?? []);
      setPosts(postsData ?? []);
    }

    load();
  }, [profile.id]);

  const flatBadges: BadgeRow[] = badges.flatMap((r) => r.badges);


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
                  // reputation={profile.reputation} will fix when we add comments and upvotes logic
                  createdAt={profile.created_at}
                />
                <BadgesSection badges={flatBadges} />
              </div>
            </div>

            {isOwner && profile.id && <ProfileActions id={profile.id} />}
          </div>
        </div>
        <div>
          <ProfilePosts posts={posts} firstname={profile.first_name}/>
        </div>
      </div>
    </div>
  );
}
