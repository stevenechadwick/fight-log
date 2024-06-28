'use server';

import prisma from '@lib/prisma';

export const getSetHistory = async (page: number, userId: string) => {
  const sets = await prisma.set.findMany({
    skip: (page - 1) * 10,
    take: 10,
    include: {
      games: true,
      notes: true,
    },
    where: {
      ownerId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const totalSets = await prisma.set.count({
    where: {
      ownerId: userId,
    },
  });

  const pages = Math.ceil(totalSets / 10);

  console.log(sets);

  return { sets: sets, pages: pages };
}