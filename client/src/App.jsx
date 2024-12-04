import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './PlayerContext';
import { GameStateProvider } from './GameStateContext';  // Import GameStateProvider
import WelcomePage from './WelcomePage';
import GameWindow from './GameWindow';
import './App.css';

const App = () => {
  return (
    <PlayerProvider>
      <GameStateProvider>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/game" element={<GameWindow />} />
        </Routes>
      </GameStateProvider>
    </PlayerProvider>
  );
}
// Wrap Routes or specific components with GameStateProvider

export default App;
