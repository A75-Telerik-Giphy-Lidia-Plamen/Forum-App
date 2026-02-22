import { profileAboutStyles as s } from "./profileAbout.styles";
interface Props {
  avatarUrl: string | null;
  username: string;
}

export function ProfileAvatar({ avatarUrl, username }: Props) {
  return (
    <img
      src={avatarUrl || "/avatar-placeholder.webp"}
      alt={username}
      className={s.avatar}
    />
  );
}
