import React, { useState, useEffect } from 'react';
import Player from './Player';
import { usePlayer } from './PlayerContext';
import './PlayerStats.css';

const PlayerStats = () => {
  const [players, setPlayers] = useState([]);  
  const { playerId } = usePlayer();

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
        setPlayers(newPlayers);
      };

      return () => {
        eventSource.close();
      };
    }
  }, [playerId]);

  return (
    <div className="player-stats-grid">
      {players.map(player => (
        <Player key={player.id} id={player.id} attrs={player} />
      ))}
    </div>
  );
};

export default PlayerStats;
