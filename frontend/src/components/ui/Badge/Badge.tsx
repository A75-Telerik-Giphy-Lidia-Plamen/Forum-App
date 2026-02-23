import { styles } from "./Badge.styles";

type BadgeProps = {
  label: string;
};

export default function Badge({ label }: BadgeProps) {
  return <span className={styles.badge}>#{label}</span>;
}
