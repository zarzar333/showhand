import React, { useState } from 'react';
import './App.css';
import MainMap from './map/mainMap';
import { AppContext } from './context/AppContext'
import LeftDrawer from './sidebar/LeftDrawer';
import Box from '@mui/material/Box';
import { LEFT_PANE_WIDTH } from './constants';
import { useParams } from 'react-router-dom';
import data from './data/data.json';

function REDetail() {
  const [selectedTypes, setSelectedTypes] = useState(['レストラン', '学校']);
  const [selectedNearbyId, setSelectedNearbyId ] = useState<number|undefined>();
  const { reid } = useParams();
  var target = data.targetInfo['ロイヤルシーズン南麻布']
  for (let [key, value] of Object.entries(data.targetInfo)) {
    // @ts-ignore
    if(value['id'] == reid) {
      target = value
    }
  }

  return (
    <div className="REDetail">
      <AppContext.Provider value={{ selectedTypes, setSelectedTypes, selectedNearbyId, setSelectedNearbyId }}>
        <Box sx={{ display: 'flex' }}>
          <LeftDrawer {...target}/>
        </Box>
        <Box component="main" sx={{ marginLeft: `${LEFT_PANE_WIDTH}px` }} >
          <MainMap target={target.name} />
        </Box>  
      </AppContext.Provider>
    </div>
  );
}

export default REDetail;