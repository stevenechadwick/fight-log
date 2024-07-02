'use server';

import prisma from '@lib/prisma';

import { RatingLineChart } from './ratingLineChart';

interface SeriesItem {
  name: string;
  data: [number, number][];
  color: string;
}

export const RatingLineChartController = async ({ userId }) => {
  const sets = await prisma.set.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    select: {
      league: true,
      rating: true,
    }
  });

  const getColorByLeague = (league: string) => {
    const leagueColors = {
      "ROOKIE": "#7F8C8D",
      "IRON": "#95A5A6", 
      "BRONZE": "#CD7F32", 
      "SILVER": "#BDC3C7", 
      "GOLD": "#F1C40F", 
      "PLATINUM": "#E5E7E9", 
      "DIAMOND": "#58D3F7", 
      "MASTER": "#9B59B6", 
    };
    const trimmedLeague = league !== "MASTER" ? league.slice(0, -2) : league;
    return leagueColors[trimmedLeague];
  }

  const transformedData = (data: { league: string; rating: number }[]): SeriesItem[] => {
    let previousPoint: [number, number] | null = null;
    const series: SeriesItem[] = [];
  
    data.forEach((item, index) => {
      if (previousPoint) {
        const seriesName = `Segment ${index}`;
        series.push({
          name: seriesName,
          data: [previousPoint, [index, item.rating]],
          color: getColorByLeague(item.league),
        });
      }
      previousPoint = [index, item.rating];
    });
  
    return series;
  };
  
  const series: SeriesItem[] = transformedData(sets);
  
  return <RatingLineChart series={series} />;
};