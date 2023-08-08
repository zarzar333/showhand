import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';


export default function LanguagePicker() {
  const { t, i18n } = useTranslation();
  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 60 }}>
    <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
      <InputLabel id="demo-simple-select-label">{t('Language')}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={i18n.language}
        onChange={handleChange}
      >
        <MenuItem value={'ja'}>日本語</MenuItem>
        <MenuItem value={'zh'}>中文</MenuItem>
        <MenuItem value={'en'}>English</MenuItem>
      </Select>
    </FormControl>
  </Box>
  )
}