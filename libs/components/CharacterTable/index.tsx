import React, { FC } from 'react';
import {
  DataGrid,
} from '@material-ui/data-grid';
import { characterTable } from '../../types/components';
import Link from '../Link';

const columns = [
  {
    field: '_id',
    headerName: 'Name',
    width: 180,
    renderCell: (params) => <Link href={`/character/${params.getValue('_id')}`} color="secondary" underline="hover">{params.getValue('_id')}</Link>
  },
  {
    field: 'hash_a',
    headerName: 'Hash A',
  },
  {
    field: 'hash_b',
    headerName: 'Hash B',
  },
  {
    field: 'guild',
    headerName: 'Guild',
    renderCell: (params) => <Link href={`/guild/${params.getValue('guild_id')}`} color="secondary" underline="hover">{params.getValue('guild')}</Link>
  },
  {
    field: 'guild_rank',
    headerName: 'Rank',
    type: 'number',
  },
  {
    field: 'average_item_level',
    headerName: 'Item Level',
    type: 'number',
  },
  { headerName: 'Class', field: 'character_class' },
  { headerName: 'Specialization', field: 'active_spec' },
  { headerName: 'Achievement Points', field: 'achievement_points', type: 'number' },
  { headerName: 'Level', field: 'level', type: 'number' },
  { headerName: 'Faction', field: 'faction' },
  { headerName: 'Race', field: 'race' },
  { headerName: 'Gender', field: 'gender' },
  { headerName: 'Covenant', field: 'chosen_covenant' },
  { headerName: 'Renown', field: 'renown_level' },
  {
    field: 'last_modified',
    headerName: 'Last Modified',
    width: 180,
    type: 'date',
  },
];

export const CharacterTable: FC<characterTable> = ({ characters, roster }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={characters}
        columns={columns}
      />
    </div>
  );
}
