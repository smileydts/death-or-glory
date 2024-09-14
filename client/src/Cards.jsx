import React, { useState, useEffect, useContext } from 'react';
import './Cards.css';
import { usePlayer } from './PlayerContext';

const Cards = () => {
  const { playerId, allPlayersReady } = usePlayer();
  const [cardData, setCardData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if(allPlayersReady) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/game_state?player_id=${playerId}`);
          const data = await response.json();
          const player = data.players.find(p => p.id === playerId);
          const playerCards = player ? player.cards : [];
          setCardData(playerCards);
          console.log(data)
        } catch (error) {
          console.error('Error fetching card data:', error);
        }
      };

      fetchData();
    }
  }, [allPlayersReady]);

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  // const handleButtonClick = (action) => {
  //   if (selectedCard === null) {
  //     alert('No card selected');
  //     return;
  //   }

  //   const card = cardData[selectedCard];
  //   alert(`Would you like to ${action} "${card}"?`);
  // };

  if (!allPlayersReady || !cardData.length) {
    return <div>Loading cards or waiting for players...</div>; // Display a loading message or spinner
  }

  return (
   
      <div className="cards-container">
       {cardData.map((card, index) => (
        <div 
        key={index}
        className={`card ${selectedCard === index ? 'selected' : ''}`}
        onClick={() => handleCardClick(index)}
        >
          <h3 className="card-title">{card.text.display}</h3>
          <p className="card-content">{card.text.hover}</p>
        </div>
      ))}
      
    
      <div className="buttons-container">
      <button className="play-button" onClick={() => handleButtonClick('play')}>Play</button>
        <button className="cashin-button" onClick={() => handleButtonClick('cash in')}>Cash In</button>
        <button className="discard-button" onClick={() => handleButtonClick('discard')}>Discard</button>

      </div>
      </div>
  );
};

export default Cards;