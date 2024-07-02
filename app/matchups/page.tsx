import prisma from "@lib/prisma";
import { getServerSession } from "next-auth";
import { MatchupSummary } from "../components/matchupSummary/matchupSummary";
import LayoutNav from "../components/navbar";


const getMatchupData = async ({userName}) => {
  const user = await prisma.user.findUnique({
    where: {
      name: userName,
    },
  });

  if (!user) return null;

  const results = await prisma.set.findMany({
    where: {
      ownerId: user.id,
    },
    select: {
      opponent_character: true,
      games: {
        select: {
          win: true,
        }
      }
    }
  });

  const matchups = results.reduce((acc, set) => {
    const opponent = set.opponent_character;
    const wins = set.games.filter(game => game.win).length;
    const totalGames = set.games.length;

    acc[opponent] = acc[opponent] || { wins: 0, totalGames: 0 };
    acc[opponent].wins += wins;
    acc[opponent].totalGames += totalGames;

    return acc;
  }, {});

  return matchups;
};

export default async function MatchupsPage() {
  const session = await getServerSession();
  if (!session) return null;

  const matchups: { [opponent: string]: { wins: number, totalGames: number } } | null = await getMatchupData({ userName: session?.user?.name });
  
  return (
    <>
      <LayoutNav />
      <div className="flex flex-wrap justify-between items-center">
        {matchups && Object.entries(matchups).map(([opponent, { wins, totalGames }]) => (
          <div className="p-4">
            <MatchupSummary key={opponent} opponent={opponent} wins={wins} totalGames={totalGames} />
          </div>
        ))}
      </div>
    </>
  );

}