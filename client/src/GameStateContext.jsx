import React, { createContext, useContext, useState } from 'react';

const defaultGameState = {
  gameState: {},
  updateGameState: () => console.warn("updateGameState not provided"),
};
const GameStateContext = createContext(defaultGameState);

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState({});

  // Function to update the game state globally
  const updateGameState = (newState) => {
    setGameState(newState);
    // can have additional actions or handling here
  };

  return (
    <GameStateContext.Provider value={{ gameState, updateGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);
