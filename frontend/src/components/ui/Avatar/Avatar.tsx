import { styles } from "./Avatar.styles";

type AvatarProps = {
  name: string;
  avatarUrl?: string | null;
  size?: "sm" | "md";
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Avatar({ name, avatarUrl, size = "sm" }: AvatarProps) {
  const dimensions = styles.sizes[size];

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={`${styles.image} ${dimensions}`}
      />
    );
  }

  return (
    <div className={`${styles.placeholder} ${dimensions}`}>
      {getInitials(name)}
    </div>
  );
}
