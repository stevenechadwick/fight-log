import { getSetHistory } from "./getSetHistory";
import MatchHistory from "./matchHistory";

export const MatchHistoryController = async ({ userId }: { userId: string | undefined }) => {
  if (!userId) return null;
  const sets = await getSetHistory(1, userId);

  return (
    <MatchHistory sets={sets} />
  );
}