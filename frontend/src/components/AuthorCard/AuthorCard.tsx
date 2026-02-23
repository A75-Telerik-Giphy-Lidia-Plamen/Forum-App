import { styles } from "./AuthorCard.styles";

type AuthorCardProps = {
  username: string;
  avatarUrl?: string | null;
  reputation?: number;
};

function getInitials(username: string) {
  const parts = username.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return username.slice(0, 2).toUpperCase();
}

function getReputationWidth(reputation: number): string {
  const capped = Math.min(reputation, 1000);
  return `${(capped / 1000) * 100}%`;
}

export default function AuthorCard({
  username,
  avatarUrl,
  reputation = 0,
}: AuthorCardProps) {
  const initials = getInitials(username);

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={username} className={styles.avatarImage} />
        ) : (
          <span className={styles.avatarCircle}>{initials}</span>
        )}
        <div>
          <p className={styles.name}>{username}</p>
          <div className={styles.reputationRow}>
            <span className={styles.reputationIcon}>★</span>
            <div className={styles.reputationBar}>
              <div
                className={styles.reputationFill}
                style={{ width: getReputationWidth(reputation) }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
