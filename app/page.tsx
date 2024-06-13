'use server';

import { getServerSession } from "next-auth";
import UserSection from "./components/userSection";
import prisma from "@lib/prisma";
import { Card, CardBody } from "@nextui-org/react";

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

  const winRate = totalGames > 0 ? totalWins / totalGames : 0;
  const mostUsedCharacter = characterUsage[0]?.player_character || 'ryu';
  const dateJoined = user.createdAt;
  const lastGame = recentSet?.createdAt;

  console.log({ dateJoined, lastGame, mostUsedCharacter, winRate, username })
  return { dateJoined, lastGame, mostUsedCharacter, winRate, username};
}
export default async function Home() {
  const session = await getServerSession();
  if (!session) return null;

  const profileData = await getProfile({ username: session?.user?.name });

  return (
    <UserSection profileData={profileData} />
  );
}
