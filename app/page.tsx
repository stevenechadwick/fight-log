'use server';

import { getServerSession } from "next-auth";
import UserSection from "./components/userSection";
import prisma from "@lib/prisma";
import AddSetButton from "./components/addSet/addSetButton";
import LayoutNav from "./components/navbar";

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

  const winRatePromise = prisma.game.aggregate({
    where: {
      ownerId: user.id,
    },
    _count: {
      _all: true,
      win: true,
    }
  });

  const [recentSet, characterUsage, gameTally] = await Promise.all([setPromise, usagePromise, winRatePromise]);

  const totalGames = gameTally._count._all;
  const totalWins = gameTally._count.win;

  const winRate = totalGames > 0 ? totalWins / totalGames * 100 : 0;
  const mostUsedCharacter = characterUsage[0]?.player_character || 'ryu';
  const dateJoined = user.createdAt;
  const lastGame = recentSet?.createdAt;

  return { dateJoined, lastGame, mostUsedCharacter, winRate, username};
}
export default async function Home() {
  const session = await getServerSession();
  if (!session) return null;

  console.log(session);

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
      </div>
    </>
  );
}
