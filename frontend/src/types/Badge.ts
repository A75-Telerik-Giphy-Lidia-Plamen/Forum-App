export type Badge = {
  awarded_at: string;
  badges: {
    id: string;
    key: string;
    name: string;
    description: string;
    icon: string;
  };
};

export type BadgeRow = {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: string;
};

export type UserBadgeRow = {
  awarded_at: string;
  badges: BadgeRow[];
};