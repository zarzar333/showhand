import react from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TypeFilters from './TypeFilters';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { data } from '../data/data';
import { LEFT_PANE_WIDTH } from '../constants';
import { Nearby } from '../data/Nearby';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

interface LeftDrawerProps {
  name: string,
  address: string,
}

export default function LeftDrawer({ name, address }: LeftDrawerProps) {
  const nearbys = data.nearby[name] as unknown as Nearby[]


  const handleClick = () => {

    // Convert the JSON object to a Blob
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

    // Create a URL for the blob
    const url = URL.createObjectURL(jsonBlob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;

    // Set the download attribute of the link to the desired file name
    link.download = `${name}-周辺施設.json`;

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Programmatically click the link to start the download
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
  };  

  return (
      <SwipeableDrawer 
        anchor={'left'}
        variant={'permanent'}
        open={true}
        sx={{
          width: LEFT_PANE_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: LEFT_PANE_WIDTH, boxSizing: 'border-box' },
        }}
        onClose={()=>{}}
        onOpen={()=>{}}
      >
        <Toolbar style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', minHeight: '300px' }}>
            <div><img src={`./photos/${-1}.png`} alt="locationPhoto" style={{ width: '260px', height: '200px' }} /></div>
            <Typography variant="h6" noWrap={false} component="div">
              <div>{name}</div>
            </Typography>
            <div style={{ fontSize: 14, color: "grey", whiteSpace: 'nowrap', overflow: 'hidden',}}>{address}</div>
            <Button variant="contained" color="primary" onClick={handleClick}>CSVを出力</Button>
        </Toolbar>
        <Divider />
        <TypeFilters nearbys={nearbys} />
      </SwipeableDrawer>
  )
}