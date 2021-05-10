import { characterResponse } from './characterResponse';

export type characterTable = {
  characters: Partial<characterResponse>[],
  roster: boolean,
}
