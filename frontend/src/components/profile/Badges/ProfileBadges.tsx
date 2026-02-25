import type { BadgeRow } from "../../../types/Badge";
import { badgesSectionStyles as s } from "./ProfileBadges.styles";

type BadgesSectionProps = {
  badges: BadgeRow[];
};

export function BadgesSection({ badges }: BadgesSectionProps) {
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <section className={s.section}>
      <h3 className={s.title}>
        Badges
      </h3>

      <div className={s.grid}>
        {badges.map((b) => (
          <div
            key={b.id}
            className={s.badgeWrapper}
          >
            <img
              src={b.icon}
              alt={b.name}
              className={s.badgeImage}
            />

            <div className={s.tooltip}>
              {b.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}