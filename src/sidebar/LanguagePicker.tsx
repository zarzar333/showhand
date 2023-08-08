import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function LanguagePicker() {
  return (
    <Box sx={{ minWidth: 60 }}>
    <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
      <InputLabel id="demo-simple-select-label">Language</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={'JP'}
        label="日本語"
      >
        <MenuItem value={'JP'}>日本語</MenuItem>
        <MenuItem value={'CN'}>中文</MenuItem>
        <MenuItem value={'EN'}>English</MenuItem>
      </Select>
    </FormControl>
  </Box>
  )
}