import react from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TypeFilters from './TypeFilters';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { data } from '../data/data';
import { LEFT_PANE_WIDTH } from '../constants';
import { Nearby } from '../data/Nearby';

interface LeftDrawerProps {
  name: string,
}

export default function LeftDrawer({ name }: LeftDrawerProps) {
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
        <Toolbar>
          <Typography variant="h6" noWrap={false} component="div">
            {name}
          </Typography>
        </Toolbar>

        <TypeFilters nearbys={nearbys} />
      </SwipeableDrawer>
  )
}