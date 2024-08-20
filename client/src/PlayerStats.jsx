import React from 'react';
import Player from './Player';  // Ensure the path is correct
import './PlayerStats.css';

const PlayerStats = () => {
  const players = [
    { id: 0, stats: { prestige: '', sexAndDrugs: '', artistType: '' } },
    { id: 1, stats: { prestige: '', sexAndDrugs: '', artistType: '' } },
    { id: 2, stats: { prestige: '', sexAndDrugs: '', artistType: '' } },
    { id: 3, stats: { prestige: '', sexAndDrugs: '', artistType: '' } }
  ];

  return (
    <div className="player-stats-grid">
      {players.map(player => <Player key={player.id} id={player.id} stats={player.stats} />)}
    </div>
  );
};

export default PlayerStats;