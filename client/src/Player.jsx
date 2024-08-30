import React from 'react';

const Player = ({ id, attrs }) => {
  return (
    <div className={`attrs-window window-${id}`}>
      <h3>{attrs.name}</h3>
      <p>Prestige: {attrs.prestige}</p>
      <p>Sex and Drugs: {attrs.sd}</p>
      <p>Artist Type: Diva</p>
    </div>
  );
};

export default Player;