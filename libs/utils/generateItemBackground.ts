import { ItemQuality } from '../types/enums';
import { backgroundColors } from '../constants';

export const generateItemBackground = (quality?: string, asset_class?: string) => {
  let index: number = 11;
  if (quality) {
    if (quality === ItemQuality.poor || quality === ItemQuality.common) index = 10;
    if (quality === ItemQuality.uncommon) index = 11;
    if (quality === ItemQuality.rare) index = 12;
    if (quality === ItemQuality.epic) index = 13;
    if (quality === ItemQuality.legendary) index = 14;
    if (quality === ItemQuality.artifact) index = 15;
    if (quality === ItemQuality.heirloom || quality === ItemQuality.wowtoken) index = 16;
  }
  if (asset_class) {
    if (asset_class === 'gold') index = 15;
    if (asset_class === 'wowtoken') index = 16;
  }

  return backgroundColors[index];
}
