import { initialValuesSearch } from '../types/components';
import { Commands } from '../types/enums';

export const submitSearchForm = (values: initialValuesSearch): string => {
  if (values.command === Commands.characters) {
    return `/${values.command}/${values.character}@${values.realm.value}`;
  } else if (values.command === Commands.guilds) {
    return `/${values.command}/${values.guild}@${values.realm.value}`;
  } else if (values.command === Commands.hash) {
    return `/${values.command}/${values.type}@${values.hash}`;
  } else if (values.command === Commands.item) {
    const realms = values.hubs.map(({value}) => value).join(';');
    return `/${values.command}/${values.item}@${realms}`;
  }
  return `/${values.command}/${values.character}/${values.realm.value}`;
}
