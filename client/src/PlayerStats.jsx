import React, { useState, useEffect } from 'react';
import Player from './Player';
import { usePlayer } from './PlayerContext';
import './PlayerStats.css';

const PlayerStats = () => {
  const [players, setPlayers] = useState([]);  
  const { playerId, allPlayersReady, setAllPlayersReady } = usePlayer();

  useEffect(() => {
    if (playerId !== null && playerId !== undefined) {

      const fetchInitialData = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get_players?player_id=${playerId}`);
        const initialPlayers = await response.json();
        setPlayers(initialPlayers);
      };

      fetchInitialData();
      
      const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/api/stream_players?player_id=${playerId}`);

      eventSource.onmessage = function(event) {
        const newPlayers = JSON.parse(event.data);
    
        // If there are any empty spots, it will say 'Waiting for player' in those spots
        const isAllPlayersReady = newPlayers.every(player => player.name !== 'Waiting for player');
        setAllPlayersReady(isAllPlayersReady);
    
        if (isAllPlayersReady) {
            eventSource.close();
            console.log('All players have joined. Closing connection.');
        }
    
        setPlayers(newPlayers);
      };

      return () => {
        eventSource.close();
      };
    }
  }, [playerId, setAllPlayersReady]);

  return (
    <div className="player-stats-grid">
      {players.map(player => (
        <Player key={player.id} id={player.id} attrs={player} />
      ))}
    </div>
  );
};

export default PlayerStats;
