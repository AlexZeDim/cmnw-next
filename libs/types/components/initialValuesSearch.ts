import { HashType } from '../enums';

export type initialValuesSearch = {
  command: string,
  realm: { label: string, value: string },
  character: string,
  guild: string,
  type: HashType,
  hash: string,
  id: string,
}
