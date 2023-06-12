import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainMap from './map/mainMap';

function App() {
  return (
    <div className="App">
      <MainMap target={'ロイヤルシーズン南麻布'} />
    </div>
  );
}

export default App;
