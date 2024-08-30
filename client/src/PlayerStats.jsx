import React, { useState, useEffect } from 'react';
import Player from './Player';
import './PlayerStats.css';

const PlayerStats = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/stream?player_id=0`);

    eventSource.onmessage = function(event) {
      const newPlayers = JSON.parse(event.data);
      setPlayers(newPlayers);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="player-stats-grid">
      {players.map(player => (
        <Player key={player.id} id={player.id} attrs={player} />
      ))}
    </div>
  );
};

export default PlayerStats;
