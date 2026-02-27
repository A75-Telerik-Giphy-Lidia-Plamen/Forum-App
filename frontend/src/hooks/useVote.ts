import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { castVote, removeVote, getUserVote } from "../services/votes.service";
import type { Vote, VoteValue } from "../types/Vote";

interface UseVoteReturn {
  userVote: Vote | null;
  isLoading: boolean;
  error: string | null;
  vote: (value: VoteValue) => Promise<void>;
}

export function useVote(targetId: string): UseVoteReturn {
  const { user } = useUser();
  const [userVote, setUserVote] = useState<Vote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;

    async function fetchUserVote() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getUserVote(user!.id, "post", targetId);

        if (isMounted) {
          setUserVote(data);
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Failed to load vote");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchUserVote();

    return () => {
      isMounted = false;
    };
  }, [targetId, user?.id]);

  const vote = async (value: VoteValue) => {
    if (!user?.id) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      if (userVote?.value === value) {
        await removeVote(user.id, "post", targetId);
        setUserVote(null);
      } else {
        const data = await castVote(user.id, "post", targetId, value);
        setUserVote(data);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to register vote");
    } finally {
      setIsLoading(false);
    }
  };

  return { userVote, isLoading, error, vote };
}
