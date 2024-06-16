import { Card, CardHeader, CardBody } from '@nextui-org/react'
import CharacterAvatar from './characterAvatar';
import { $Enums } from '@prisma/client';

export type UserSectionProps = {
  profileData: {
    dateJoined: Date,
    lastGame: Date | undefined,
    mostUsedCharacter: $Enums.Character,
    winRate: number,
    username: string
  } | null;
}

export default function UserSection({ profileData }: UserSectionProps) {
  if (!profileData) return null;

  const { dateJoined, lastGame, mostUsedCharacter, winRate, username } = profileData;

  return (
    <Card fullWidth className="w-full flex items-center">
      <CardBody>
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <CharacterAvatar character={mostUsedCharacter || 'ryu'} width={143.75} height={156.25} />
          <div>
            <h3>{username}</h3>
            <p>Date Joined: {dateJoined.toLocaleDateString()}</p>
            <p>Last Game: {lastGame ? lastGame.toLocaleDateString() : "Never" }</p>
            <p>Win Rate: {winRate} %</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}