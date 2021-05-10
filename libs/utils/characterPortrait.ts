import { Faction } from '../types/enums';

export const characterPortrait = (faction?: Faction, media?: string): string => {
  if (media) return media;
  if (faction && Faction.A) return './alliance.png';
  if (faction && Faction.H) return './horde.png';
  return './vercel.svg'
}
