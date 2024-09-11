import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './PlayerContext';
import WelcomePage from './WelcomePage';
import GameWindow from './GameWindow';
import './App.css';

const App = () => {
  return (
    <PlayerProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/game" element={<GameWindow />} />
      </Routes>
    </PlayerProvider>
  );
}

export default App;
