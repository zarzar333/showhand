import react from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TypeFilters from './TypeFilters';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { data } from '../data/data';
import { LEFT_PANE_WIDTH } from '../constants';
import { Nearby } from '../data/Nearby';
import Divider from '@mui/material/Divider';

interface LeftDrawerProps {
  name: string,
  address: string,
}

export default function LeftDrawer({ name, address }: LeftDrawerProps) {
  const nearbys = data.nearby[name] as unknown as Nearby[]
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
        <Toolbar style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '260px'  }}>
            <div><img src={`./photos/${-1}.png`} alt="locationPhoto" style={{ width: '260px', height: '200px' }} /></div>
            <Typography variant="h6" noWrap={false} component="div">
              <div>{name}</div>
            </Typography>
            <span style={{ fontSize: 14, color: "grey", whiteSpace: 'nowrap', overflow: 'hidden',}}>{address}</span>
        </Toolbar>
        <Divider />
        <TypeFilters nearbys={nearbys} />
      </SwipeableDrawer>
  )
}