'use client';

import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";

export default function MatchHistory({ sets }) {
  const columns = [
    { label: 'Date Logged', key: 'createdAt' },
    { label: 'Character', key: 'player_character' },
    { label: 'Opponent Character', key: 'opponent_character' },
    { label: 'Result', key: 'result' },
    { label: 'Post Rating', key: 'rating' },
    { label: 'Post Rank', key: 'league' },
    { label: 'Notes', key: 'notes' },
  ];

  const rows = sets.map((set) => {
    return {
      key: set.id,
      createdAt: set.createdAt.toDateString(),
      player_character: set.player_character,
      opponent_character: set.opponent_character,
      result: set.games.map((game) => game.win ? 'W' : 'L').join(' '),
      rating: set.rating,
      league: set.league,
      notes: set.notes.length > 0 ? set.notes[0]?.content : '-',
    }
  });

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}