import React, { useState, useEffect, useContext } from 'react';
import './Cards.css';
import { usePlayer } from './PlayerContext';
import { useGameState } from './GameStateContext';
import { handleGameAction } from './gameService';
import Modal from './Modal';

const Cards = () => {
  const { playerId, allPlayersReady, activePlayer, setActivePlayer } = usePlayer();
  const { gameState, updateGameState } = useGameState();
  const [cardData, setCardData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const isButtonEnabled = selectedCards.length === 1;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState('');

  useEffect(() => {
    if(allPlayersReady) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/game_state?player_id=${playerId}`);
          const data = await response.json();
          updateGameState(data);
          const player = data.players.find(p => p.id === playerId);
          const playerCards = player ? player.cards : [];
          setCardData(playerCards);
          setActivePlayer(data.turn)
        } catch (error) {
          console.error('Error fetching card data:', error);
        }
      };

      fetchData();
    }
  }, [allPlayersReady]);

  const openModal = (action) => {
    if (selectedCards.length === 0) {
      alert('No card selected');
      return;
    }
    setModalAction(action); // Set the current action (Play, Cash In, Discard)
    setModalVisible(true);  // Show the modal
  };

  const handleModalConfirm = () => {
    handleGameAction('cash', playerId, cardData[selectedCards[0]].id, updateGameState);
    // console.log(gameState)
    // need useEffect here and elsewhere to ensure synchronous update of gameState
    setModalVisible(false); 
  }

  const handleModalCancel = () => {
    setModalVisible(false); // Close the modal without making any changes
  };

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
      if (playerId === activePlayer) {
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
          <p className="card-content">Cash-in value: {card.value}</p>
          <p className="card-content">{card.text.hover}</p>
        </div>
      ))}
      
       
      
     
      <div className="buttons-container">
        <button className="play-button" onClick={() => openModal('play')}>Play</button>
        <button className="cashin-button" onClick={() => openModal('cash')} disabled={!isButtonEnabled}>Cash In</button>
        <button className="discard-button" onClick={() => openModal('discard')}>Discard</button>

      
      </div>

    {/* Only render Modal when modalVisible is true */}
    {modalVisible && (
        <Modal
          isVisible={modalVisible}
          title="Confirm Action"
          message={`Would you like to ${modalAction} this card?`}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}
    </div>
  );
};

export default Cards;
