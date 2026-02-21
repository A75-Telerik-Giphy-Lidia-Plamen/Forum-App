import { profileAboutStyles as s } from "./profileAbout.styles";

interface Props {
  reputation: number;
  createdAt: string;
}

export function ProfileStats({ reputation, createdAt }: Props) {
  return (
    <div className={s.statsRow}>
      <span>
        Joined {new Date(createdAt).toLocaleDateString()}
      </span>

      <span>{reputation} pts</span>
    </div>
  );
}
