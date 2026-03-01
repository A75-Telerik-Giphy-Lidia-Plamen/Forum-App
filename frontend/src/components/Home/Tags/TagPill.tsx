import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  name: string;
};

export default function TagPill({ id, name }: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/posts/tag/${id}`)}
      className="
        px-4 py-2 rounded-full
        text-sm font-medium
        border border-zinc-200 dark:border-zinc-700
        text-zinc-700 dark:text-zinc-200
        hover:bg-orange-100 hover:border-orange-400
        dark:hover:bg-orange-900/30
        transition-all duration-200
        bg-zinc-200/60 dark:bg-zinc-800/60
        backdrop-blur-sm
      "
    >
      {name}
    </button>
  );
}