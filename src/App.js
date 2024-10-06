import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/NewHeader/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Map from './pages/Map';
import PollutionInfo from './pages/PollutionInfo';
import Forecast from './pages/Forecast';
import Notifications from './pages/Notifications';
import SmokePrediction from './pages/SmokePrediction';
import SafeLevels from './pages/SafeLevels';
import News from './pages/News';
import GlobalStyles from './styles/GlobalStyles';

import './App.css';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/pollution-info" element={<PollutionInfo />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/smoke-prediction" element={<SmokePrediction />} />
        <Route path="/safe-levels" element={<SafeLevels />} />
        <Route path="/news" element={<News />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
