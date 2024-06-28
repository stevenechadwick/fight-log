'use server';

import { getServerSession } from "next-auth";

import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

type GameCreateWithoutSetInput = Prisma.GameCreateWithoutSetInput;

const encodeRounds = (r1 : boolean, r2 : boolean, r3 : boolean) => {
  const encoded = (r1 ? '1' : '0') + (r2 ? '1' : '0') + (r3 ? '1' : '0');
  return parseInt(encoded, 2);
};

const isWinner = (r1: boolean, r2: boolean, r3: boolean) => {
  const rounds = encodeRounds(r1, r2, r3);
  return rounds === 3 || rounds === 5 || rounds === 6;
};


export const addSet = async (formData) => {
  const session = await getServerSession();
  if (!session) return null;
  if (!session.user?.name) return null;

  try {
    const user = await prisma.user.findUnique({
      where: {
        name: session?.user?.name,
      },
    });

    if (!user) return null;

    const g1 = {
      rounds: encodeRounds(formData.g1_r1, formData.g1_r2, formData.g1_r3),
      win: isWinner(formData.g1_r1, formData.g1_r2, formData.g1_r3),
      owner: { connect: { id: user.id } }
    }

    const g2 = formData.g2 ? {
      rounds: encodeRounds(formData.g2_r1, formData.g2_r2, formData.g2_r3),
      win: isWinner(formData.g2_r1, formData.g2_r2, formData.g2_r3),
      owner: { connect: { id: user.id } }
    } : null;

    const g3 = formData.g3 ? {
      rounds: encodeRounds(formData.g3_r1, formData.g3_r2, formData.g3_r3),
      win: isWinner(formData.g3_r1, formData.g3_r2, formData.g3_r3),
      owner: { connect: { id: user.id } }
    } : null;

    const result = await prisma.$transaction([
      prisma.set.create({
        data: {
          owner: { connect: { id: user.id } },
          player_character: formData.player_character,
          opponent_character: formData.opponent_character,
          league: formData.rank,
          rating: parseInt(formData.rating, 10),
          notes: {
            create: {
              content: formData.notes,
            }
          },
          games: {
            create: [
              g1,
              ...(g2 ? [g2] : []),
              ...(g3 ? [g3] : [])
            ]
          },
        }
      })
    ]);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}