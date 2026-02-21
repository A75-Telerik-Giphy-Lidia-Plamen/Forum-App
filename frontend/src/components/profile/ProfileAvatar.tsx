interface Props {
  avatarUrl: string | null;
  username: string;
}

export function ProfileAvatar({ avatarUrl, username }: Props) {
  return (
    <img
      src={avatarUrl || "/avatar-placeholder.webp"}
      alt={username}
      className="profile-avatar"
    />
  );
}
