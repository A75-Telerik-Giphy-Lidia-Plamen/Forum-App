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
          <div className="mt-1 space-y-1">

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <span className={styles.reputationIcon}>★</span>
                <span className="text-stone-600 dark:text-zinc-300 font-medium">
                  Reputation
                </span>
              </div>

              <span className="text-stone-500 dark:text-zinc-400">
                {reputation} pts
              </span>
            </div>

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
