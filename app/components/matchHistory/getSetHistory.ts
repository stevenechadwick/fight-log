'use server';

import prisma from '@lib/prisma';

export const getSetHistory = async (page: number, userId: string) => {
  const sets = await prisma.set.findMany({
    skip: (page - 1) * 20,
    take: 20,
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

  return sets;
}