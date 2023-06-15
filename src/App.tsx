import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MainMap from './map/mainMap';
import { AppContext } from './context/AppContext'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import LeftDrawer from './sidebar/LeftDrawer';
import Box from '@mui/material/Box';

function App() {
  const [selectedTypes, setSelectedTypes] = useState(['レストラン', '学校']);
  return (
    <div className="App">
      <AppContext.Provider value={{ selectedTypes, setSelectedTypes }}>
        <Box sx={{ display: 'flex' }}>
          <LeftDrawer name='ロイヤルシーズン南麻布'/>
        </Box>
        <Box component="main" >
          <MainMap target={'ロイヤルシーズン南麻布'} />
        </Box>
      </AppContext.Provider>
    </div>
  );
}

export default App;
