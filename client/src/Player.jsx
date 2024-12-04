import React from 'react';

const Player = ({ id, attrs, isActive }) => {
  return (
    <div className={`stats-window window-${id}`}>
      <h3 className={isActive ? 'active-player' : ''}>{attrs.name}</h3>
      <p>Prestige: {attrs.prestige}</p>
      <p>Sex and Drugs: {attrs.sd}</p>
      <p>Artist Type: Diva</p>
    </div>
  );
};

export default Player;