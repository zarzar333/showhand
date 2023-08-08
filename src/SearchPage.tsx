import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';

interface Item {
  id: number;
  name: string;
}

const items: Item[] = [
  { id: 1001, name: 'ロイヤルシーズン南麻布' },
  { id: 1000, name: 'シティハウス赤羽レジデンス' },
  { id: 1002, name: 'ブランズ碑文谷' },
];

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelectItem = (event: any, value: Item | null) => {
    if (value) navigate(`/redetail/${value.id}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20%' }}>
      <Autocomplete
        id="search-box"
        options={items}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        onChange={handleSelectItem}
        renderInput={
          // @ts-ignore
          (params) => <TextField {...params} label={t('Search by Building Name')} variant="outlined" />
        }
      />
    </div>
  );
}

export default SearchPage;
