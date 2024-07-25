import React from 'react';
import './PlayerStats.css'; // Import CSS file for styling

const PlayerStats = () => {
  return (
    <div className="player-stats-grid">
     <div className="stats-window window-1">
      <p>Player 1 Stats</p>
      {/* Add more stats here */}
      </div>
    <div className="stats-window window-2">
      <p>Player 2 Stats</p>
      {/* Add more stats here */}
    </div>
    <div className="stats-window window-3">
      <p>Player 3 Stats</p>
      {/* Add more stats here */}
    </div>
    <div className="stats-window window-4">
      <p>Player 4 Stats</p>
      {/* Add more stats here */}
    </div>
  </div>
  );
};

export default PlayerStats;