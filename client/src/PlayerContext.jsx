import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
    const [playerId, setPlayerId] = useState(null);
    const [allPlayersReady, setAllPlayersReady] = useState(false);

    return (
        <PlayerContext.Provider value={{ playerId, setPlayerId, allPlayersReady, setAllPlayersReady }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);