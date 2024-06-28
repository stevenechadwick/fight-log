'use client';

import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { getSetHistory } from "./getSetHistory";

export default function MatchHistory({ pages, sets, userId }) {

  const [currentSets, setCurrentSets] = useState(sets);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getSetHistory(page, userId).then(({ sets }) => {
      setCurrentSets(sets);
    });
  }, [page, userId]);

  const columns = [
    { label: 'Date Logged', key: 'createdAt' },
    { label: 'Character', key: 'player_character' },
    { label: 'Opponent Character', key: 'opponent_character' },
    { label: 'Result', key: 'result' },
    { label: 'Post Rating', key: 'rating' },
    { label: 'Post Rank', key: 'league' },
  ];

  const rows = currentSets.map((set) => {
    return {
      key: set.id,
      createdAt: set.createdAt.toDateString(),
      player_character: set.player_character,
      opponent_character: set.opponent_character,
      result: set.games.map((game) => game.win ? 'W' : 'L').join(' '),
      rating: set.rating,
      league: set.league,
    }
  });

  return (
    <Table
      aria-label="Example table with dynamic content"
      bottomContent={
        pages > 1 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          // @ts-ignore
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}