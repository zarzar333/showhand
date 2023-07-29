import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MainMap from './map/mainMap';
import { AppContext } from './context/AppContext'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import LeftDrawer from './sidebar/LeftDrawer';
import Box from '@mui/material/Box';
import { LEFT_PANE_WIDTH } from './constants';


function App() {
  const [selectedTypes, setSelectedTypes] = useState(['レストラン', '学校']);
  const [selectedNearbyId, setSelectedNearbyId ] = useState<number|undefined>();
  return (
    <div className="App">
      <AppContext.Provider value={{ selectedTypes, setSelectedTypes, selectedNearbyId, setSelectedNearbyId }}>
        <Box sx={{ display: 'flex' }}>
          <LeftDrawer name='ロイヤルシーズン南麻布' />
        </Box>
        <Box component="main" sx={{ marginLeft: `${LEFT_PANE_WIDTH}px` }} >
          <MainMap target={'ロイヤルシーズン南麻布'} />
        </Box>
      </AppContext.Provider>
    </div>
  );
}

export default App;
