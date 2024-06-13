import { Image } from '@nextui-org/react'
import NextImage from 'next/image'

export type CharacterAvatarProps = {
  character: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function CharacterAvatar({ character, width = 64, height = 64, className= ''} : CharacterAvatarProps) {
  return (
    <Image
      className={className}
      as={NextImage}
      src={`/images/${character.toLowerCase()}.png`}
      alt={character}
      width={width || 64}
      height={height || 64}
    />
  );
}