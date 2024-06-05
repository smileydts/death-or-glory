import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage.jsx'
import GameWindow from './GameWindow.jsx'
import './App.css';

const App = () => {
    return (
      <div>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/game" element={<GameWindow />} />
        </Routes>
      </div>
    );
}

export default App
