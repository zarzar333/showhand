import react from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import TypeFilters from './TypeFilters';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { data } from '../data/data';
import { LEFT_PANE_WIDTH } from '../constants';
import { Nearby } from '../data/Nearby';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import LanguagePicker from './LanguagePicker';
import { useTranslation } from 'react-i18next';

interface LeftDrawerProps {
  name: string,
  address: string,
  id: number
}

function convertToCSV(jsonArray: any[]): string {
  if (jsonArray.length === 0) return '';

  const keys = Object.keys(jsonArray[0]);
  const lines = jsonArray.map(row => keys.map(key => JSON.stringify(row[key] || '', (key, value) => value === null ? '' : value)).join(','));
  
  return [keys.join(',')].concat(lines).join('\r\n');
}


export default function LeftDrawer({ name, address, id }: LeftDrawerProps) {
  const nearbys = data.nearby[name] as unknown as Nearby[]
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {

    // Convert the JSON object to a Blob
    const csvBlob = new Blob([convertToCSV(data.nearby[name])], { type: 'application/json' });

    // Create a URL for the blob
    const url = URL.createObjectURL(csvBlob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;

    // Set the download attribute of the link to the desired file name
    link.download = `${name}-周辺施設.csv`;

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Programmatically click the link to start the download
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
  };  

  return (
      <Drawer 
        anchor={'left'}
        variant={'permanent'}
        open={true}
        sx={{
          width: LEFT_PANE_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: LEFT_PANE_WIDTH, boxSizing: 'border-box' },
        }}
        onClose={()=>{}}
      >
        <Toolbar style={{ display: 'flex', flexDirection: 'row', alignItems: 'left' , minHeight: '50px'}}>
            <Typography variant="h6" noWrap={true} component="div">
              Showhand 
            </Typography>
            <Button onClick={() => navigate(-1)} variant="outlined">{t('Back')}</Button>
            <LanguagePicker />
        </Toolbar>
        <Divider />
        <Box sx={{ my: 1, mx: 1 }}>
        <Grid container direction="column" alignItems="center">
          <Grid item><img src={`/showhand/photos/${id}.png`} alt="locationPhoto" style={{ width: '260px', height: '200px' }} /></Grid>
          <Grid item>
            <Typography variant="h6" noWrap={true} component="div">
              <div>{name}</div>
            </Typography>
          </Grid>
          <Grid item>
            <div style={{ fontSize: 14, color: "grey", whiteSpace: 'nowrap', overflow: 'hidden',}}>{address}</div>
          </Grid>
          <Grid item>
          <Button variant="contained" color="primary" onClick={handleClick}>{t('Export to CSV')}</Button>
          </Grid>
        </Grid>
        </Box>
        <Divider variant="middle" />
        <TypeFilters nearbys={nearbys} />
      </Drawer>
  )
}