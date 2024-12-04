import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
    const [playerId, setPlayerId] = useState(null);
    const [allPlayersReady, setAllPlayersReady] = useState(false);
    const [activePlayer, setActivePlayer] = useState(null);

    return (
        <PlayerContext.Provider value={{
            playerId, 
            setPlayerId, 
            allPlayersReady, 
            setAllPlayersReady, 
            activePlayer,
            setActivePlayer
        }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);