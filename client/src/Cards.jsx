import React, { useState, useEffect, useContext } from 'react';
import './Cards.css';
import { usePlayer } from './PlayerContext';

const Cards = () => {
  const { playerId, allPlayersReady } = usePlayer();
  const [cardData, setCardData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

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
    const isSelected = selectedCards.includes(index);
    const currentCardId = cardData[index].id;
  
    if (isSelected) {
      if (selectedCards.length === 1) {
        // Rule 1: Deselect the card if it's the only one selected
        setSelectedCards([]);
      } else if (currentCardId.includes('modifier')) {
        // Rule 2: Deselect only this card if it's a modifier
        setSelectedCards(prevSelected => prevSelected.filter(i => i !== index));
      } else {
        // Rule 3: Deselect all cards if the clicked card is not a modifier
        setSelectedCards([]);
      }
    } else {
      const currentSelectionIds = selectedCards.map(i => cardData[i].id);
      let isSelectable = false;
      if (selectedCards.length === 0) {
        isSelectable = true;
      } else {
        const hasRecord = currentSelectionIds.some(id => /^record_\d$/.test(id));
        const hasTour = currentSelectionIds.some(id => /^tour_\d$/.test(id));
  
        if (hasRecord) {
          isSelectable = currentCardId.includes('record') || currentCardId.includes('record_modifier');
        } else if (hasTour) {
          isSelectable = currentCardId.includes('tour') || currentCardId.includes('tour_modifier');
        }
      }
  
      if (isSelectable) {
        setSelectedCards(prevSelected => [...prevSelected, index]);
      }
    }
  };

  if (!allPlayersReady || !cardData.length) {
    return <div>Loading cards or waiting for players...</div>; // Display a loading message or spinner
  }

  return (
      <div className="cards-container">
       {cardData.map((card, index) => (
        <div 
        key={index}
        className={`card ${selectedCards.includes(index) ? 'selected' : ''}`}
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
