
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import react from 'react';
import TypeFilters from './TypeFilters';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


interface LeftDrawerProps {
  name: string,
}

const width = 240;
export default function LeftDrawer({ name }: LeftDrawerProps) {
  
  return (
      <SwipeableDrawer 
        anchor={'left'}
        variant={'permanent'}
        open={true}
        sx={{
          width: width,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' },
        }}
        onClose={()=>{}}
        onOpen={()=>{}}
      >
        <Toolbar>
          <Typography variant="h6" noWrap={false} component="div">
            {name}
          </Typography>
        </Toolbar>
        <TypeFilters></TypeFilters>
      </SwipeableDrawer>
  )
}