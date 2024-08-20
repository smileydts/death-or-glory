import React from 'react';

const Player = ({ id, stats }) => {
  return (
    <div className={`stats-window window-${id}`}>
      <h3>Player {id} Stats</h3>
      <p>Prestige: {stats.prestige}</p>
      <p>Sex and Drugs: {stats.sd}</p>
      <p>Artist Type: Diva</p>
    </div>
  );
};

export default Player;