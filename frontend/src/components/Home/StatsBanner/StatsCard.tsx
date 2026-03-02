import type { LucideIcon } from "lucide-react";
import { statsStyles as s} from "./StatsBanner.styles";
import { useCountUp } from "../../../hooks/useCount";

export default function StatCard({ value, label, icon }: { value: number; label: string; icon: LucideIcon }) {
  const { count, ref } = useCountUp(value);
  const Icon = icon;

  return (
    <div ref={ref} className={s.card}>
      <Icon className={s.icon} />
      <h2 className={s.value}>{count}</h2>
      <p className={s.label}>{label}</p>
    </div>
  );
}