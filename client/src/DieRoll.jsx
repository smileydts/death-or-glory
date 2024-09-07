import React, { useState } from 'react';
import './DieRoll.css';  // Import the CSS file

const diceImages = [
  '/images/Dice1.jpg',
  '/images/Dice2.jpg',
  '/images/Dice3.jpg',
  '/images/Dice4.jpg',
  '/images/Dice5.jpg',
  '/images/Dice6.jpg'
  ];

const DieRoll = () => {
  const [dice, setDice] = useState([0, 0]);
  const [sum, setSum] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  // Function to roll two dice
  const rollDice = () => {
    setIsShuffling(true);

    // Generate new dice values
    const newDice = [Math.floor(Math.random() * 6), Math.floor(Math.random() * 6)];
    const newSum = newDice[0] + newDice[1] + 2; // Adjust sum to match 1-6 range

    // Update dice and sum after a delay
    setTimeout(() => {
      setDice(newDice);
      setSum(newSum);
      setIsShuffling(false);
    }, 1000);  // Duration of shuffle animation
  };

  return (
    <div className="centercontainer">
      <div className={`dice-container ${isShuffling ? 'shuffle' : ''}`}>
        <img src={diceImages[dice[0]]} alt={`Dice ${dice[0] + 1}`} className="dice-image" />
        <img src={diceImages[dice[1]]} alt={`Dice ${dice[1] + 1}`} className="dice-image" />
      </div>
      <p className="dicetotal">Total: {sum}</p>
      <div className="button-container">
        <button onClick={rollDice}>Roll Dice</button>
      </div>  
    </div>
  );
};
export default DieRoll;