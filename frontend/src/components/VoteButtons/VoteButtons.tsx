import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useVote } from "../../hooks/useVote";
import Button from "../ui/Button/Button";
import { styles } from "./VoteButtons.styles";

interface VoteButtonsProps {
  postId: string;
  likesCount: number;
  dislikesCount: number;
  onVote?: (value: 1 | -1, previousValue: 1 | -1 | null) => void;
}

export default function VoteButtons({
  postId,
  likesCount,
  dislikesCount,
  onVote,
}: VoteButtonsProps) {
  const { userVote, isLoading, vote } = useVote(postId);

  async function handleVote(value: 1 | -1) {
    const previousValue = userVote?.value ?? null;
    await vote(value);
    onVote?.(value, previousValue);
  }

  return (
    <>
      <Button
        onClick={() => handleVote(1)}
        disabled={isLoading}
        className={userVote?.value === 1 ? styles.active : ""}
      >
        <ThumbsUp
          className={userVote?.value === 1 ? styles.activeIcon : styles.icon}
        />
        {likesCount}
      </Button>
      <Button
        onClick={() => handleVote(-1)}
        disabled={isLoading}
        className={userVote?.value === -1 ? styles.active : ""}
      >
        <ThumbsDown
          className={userVote?.value === -1 ? styles.activeIcon : styles.icon}
        />
        {dislikesCount}
      </Button>
    </>
  );
}
