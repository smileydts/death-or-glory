import React, { createContext, useContext, useState, useEffect } from 'react';

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
    const [playerId, setPlayerId] = useState(null);

    return (
        <PlayerContext.Provider value={{ playerId, setPlayerId }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);