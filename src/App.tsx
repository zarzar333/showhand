import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import REDetail from './REDetail';

const App: React.FC = () => {
  console.log('Starting...');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/redetail/:reid" element={<REDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
