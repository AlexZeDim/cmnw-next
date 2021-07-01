import { itemResponse, realmResponse } from '../types/components';

export const generateItemTitle = (
  item: Partial<itemResponse>,
  realms: Partial<realmResponse>[],
) => {
  let
    itemTitle: string,
    realmTitle: string;

  const is_gold = item._id === 1;
  const is_xrs = realms.length > 1;
  const is_commdty = item.asset_class.includes('commdty');

  if (item.ticker) {
    itemTitle = item.ticker.toUpperCase();
  } else if (item.name?.en_GB) {
    itemTitle = item.name?.en_GB;
  } else if (item._id) {
    itemTitle = `#${item._id}`;
  }

  if (realms.length === 1) {
    const [realm] = realms;
    if (realm.realms && itemTitle.length < 7) {
      itemTitle = itemTitle.concat('@', realm.realms[0]);
    }
    realmTitle = realm.realms[0];
  } else {
    realmTitle = realms.map(r => r.realms.map(r => r).join(', ')).join(', ');
  }

  return { itemTitle, realmTitle, is_gold, is_xrs, is_commdty };
}
