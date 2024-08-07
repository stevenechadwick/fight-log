'use client';

import { useEffect, useState } from "react";
import { Pagination, Spinner } from "@nextui-org/react";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { getSetHistory } from "./getSetHistory";
import { HumanReadableCharacterNames, HumanReadableLeagueNames } from "../../constants";

export default function MatchHistory({ pages, sets, userId }) {

  const [currentSets, setCurrentSets] = useState(sets);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSetHistory(page, userId).then(({ sets }) => {
      setCurrentSets(sets);
      setIsLoading(false);
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
    const wins = set.games.filter((game) => game.win).length;
    const losses = set.games.length - wins;
    return {
      key: set.id,
      createdAt: set.createdAt.toDateString(),
      player_character: HumanReadableCharacterNames[set.player_character],
      opponent_character: HumanReadableCharacterNames[set.opponent_character],
      result: `${wins}-${losses}`,
      rating: set.rating,
      league: HumanReadableLeagueNames[set.league],
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
              onChange={(page) => {
                setPage(page)
                setIsLoading(true);
              }}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} loadingContent={<Spinner />} isLoading={isLoading}>
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