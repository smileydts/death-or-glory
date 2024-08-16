import React from 'react';
import './PlayerStats.css'; // Import CSS file for styling

const PlayerStats = () => {
  return (
    <div className="player-stats-grid">
     <div className="stats-window window-1">
      <h3>Player 1 Stats</h3>
      <p>Prestige:</p>
      <p>Sex and Drugs:</p>
      <p>Artist Type:</p>
      {/* Add more stats here */}
      </div>
    <div className="stats-window window-2">
      <h3>Player 2 Stats</h3>
      <p>Prestige:</p>
      <p>Sex and Drugs:</p>
      <p>Artist Type:</p>
      {/* Add more stats here */}
    </div>
    <div className="stats-window window-3">
      <h3>Player 3 Stats</h3>
      <p>Prestige:</p>
      <p>Sex and Drugs:</p>
      <p>Artist Type:</p>
      {/* Add more stats here */}
    </div>
    <div className="stats-window window-4">
      <h3>Player 4 Stats</h3>
      <p>Prestige:</p>
      <p>Sex and Drugs:</p>
      <p>Artist Type:</p>
      {/* Add more stats here */}
    </div>
  </div>
  );
};

export default PlayerStats;