import type { LucideIcon } from "lucide-react";
import { statsStyles as s} from "./StatsBanner.styles";

export default function StatCard({ value, label, icon }: { value: number; label: string; icon: LucideIcon }) {
  const Icon = icon;
  return (
    <div className={s.card}>
      <Icon className={s.icon} />
      <h2 className={s.value}>{value.toLocaleString()}</h2>
      <p className={s.label}>{label}</p>
    </div>
  );
}