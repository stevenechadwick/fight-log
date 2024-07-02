import { Card, CardHeader, CardBody, CircularProgress, Chip } from '@nextui-org/react';
import CharacterAvatar from '../characterAvatar';

export const MatchupSummary = ({ opponent, wins, totalGames }) => {
  const winRate = parseInt((totalGames > 0 ? (wins / totalGames) * 100 : 0).toFixed(2));

  let color: "success" | "warning" | "default" | "primary" | "secondary" | "danger" | undefined;
  if (winRate >= 60) {
    color = 'success';
  } else if (winRate >= 40) {
    color = 'warning';
  } else {
    color = 'danger';
  }

  return (
    <Card className='py-4' style={{width: '250px'}}>
      <CardHeader className="flex-row items-center pb-0 pt-2 px-4">
        <CharacterAvatar character={opponent} width={128} height={128} />
        <CircularProgress value={winRate} size="lg" aria-label="win-rate" showValueLabel={true} color={color}/>
      </CardHeader>
      <CardBody>
        <div className="flex justify-center flex-row">
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          {wins} wins
        </Chip>
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          {totalGames} games
        </Chip>
        </div>
      </CardBody>
    </Card>
  );
}