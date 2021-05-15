import { initialValuesSearch } from '../types/components';
import { Commands } from '../types/enums';

export const submitSearchForm = (values: initialValuesSearch): string => {
  if (values.command === Commands.characters) {
    return `/${values.command}/${values.character}@${values.realm.value}`;
  } else if (values.command === Commands.guilds) {
    return `/${values.command}/${values.guild}@${values.realm.value}`;
  } else if (values.command === Commands.hash) {
    return `/${values.command}/${values.type}@${values.hash}`;
  }
  return `/${values.command}/${values.character}/${values.realm.value}`;
}
