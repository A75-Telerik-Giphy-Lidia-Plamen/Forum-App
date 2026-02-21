import { profileAboutStyles as s } from "./profileAbout.styles";

interface Props {
  firstName: string;
  lastName: string;
  username: string;
  bio: string | null;
}

export function ProfileMeta({
  firstName,
  lastName,
  username,
  bio,
}: Props) {
  return (
    <div>
      <h2 className={s.name}>
        {firstName} {lastName}
      </h2>

      <p className={s.username}>
        @{username}
      </p>

      {bio && (
        <p className={s.bio}>
          {bio}
        </p>
      )}
    </div>
  );
}
