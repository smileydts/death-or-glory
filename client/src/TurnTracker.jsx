import React from 'react';
import './TurnTracker.css'; // Import CSS file for styling

const TurnTracker = () => {
  const boxes = [];
  for (let i = 1; i <= 9; i++) {
    boxes.push(<div key={i} className="box">{i}</div>);
  }

  return (
    <div className="turncontainer">
      <div className="turn-label">Turn</div>
      {boxes}
    </div>
  );
};

export default TurnTracker;