import { getServerSession } from "next-auth";
import UserSection from "./components/userSection";
import prisma from "@lib/prisma";
import AddSetButton from "./components/addSet/addSetButton";
import LayoutNav from "./components/navbar";
import MatchHistory from "./components/matchHistory/matchHistory";
import { MatchHistoryController } from "./components/matchHistory/matchHistoryController";

async function getProfile({ username }) {
  const user = await prisma.user.findUnique({
    where: {
      name: username,
    },
  });

  if (!user) return null;

  const setPromise = prisma.set.findFirst({
    where: {
      ownerId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const usagePromise = prisma.set.groupBy({
    by: ['player_character'],
    where: {
      ownerId: user.id,
    },
    _count: {
      player_character: true,
    },
    orderBy: {
      _count: {
        player_character: 'desc',
      },
    },
  });

  const totalGamesPromise = prisma.game.count({
    where: {
      ownerId: user.id
    }
  });

  const wonGamesPromise = prisma.game.count({
    where: {
      ownerId: user.id,
      win: true
    }
  });

  const [recentSet, characterUsage, gameTally, wonGames] = await Promise.all([setPromise, usagePromise, totalGamesPromise, wonGamesPromise]);

  const winRate = gameTally > 0 ? (wonGames / gameTally) * 100 : 0;
  const mostUsedCharacter = characterUsage[0]?.player_character || 'ryu';
  const dateJoined = user.createdAt;
  const lastGame = recentSet?.createdAt;

  return { dateJoined, lastGame, mostUsedCharacter, winRate, username, userId: user.id};
}
export default async function Home() {
  const session = await getServerSession();
  if (!session) return null;

  const profileData = await getProfile({ username: session?.user?.name });

  return (
    <>
      {
        // TODO: override navbar on login/signup pages rather than removing it from the root layout
      }
      <LayoutNav />
      <div className="flex flex-col gap-y-4">
        <UserSection profileData={profileData} />
        <AddSetButton />
        <MatchHistoryController userId={profileData?.userId} />
      </div>
    </>
  );
}
