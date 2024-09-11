import React, { useState, useEffect } from 'react';
import './Cards.css'; // Import CSS file for styling

const Cards = () => {
  // Placeholder data for cards
  const placeholderData = [
    { title: 'Card 1', content: 'This is the content of Card 1.' },
    { title: 'Card 2', content: 'This is the content of Card 2.' },
    { title: 'Card 3', content: 'This is the content of Card 3.' },
    { title: 'Card 4', content: 'This is the content of Card 4.' },
    { title: 'Card 5', content: 'This is the content of Card 5.' }
  ];

  const [cardData, setCardData] = useState(placeholderData);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    // Simulate data fetching here and update the state
    // In the future, replace this with actual API call
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('https://your-api-endpoint.com/cards'); // Replace with your API endpoint
    //     const data = await response.json();
    //     setCardData(data);
    //   } catch (error) {
    //     console.error('Error fetching card data:', error);
    //   }
    // };

    // fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const handleButtonClick = (action) => {
    if (selectedCard === null) {
      alert('No card selected');
      return;
    }
    const card = cardData[selectedCard];
    const userConfirmed = window.confirm(`Would you like to ${action} "${card.title}"?`);

    if (userConfirmed) {
      // Instead of removing the card, hide it
      const updatedCards = cardData.map((card, index) =>
        index === selectedCard ? { ...card, hidden: true } : card
      );
      setCardData(updatedCards);
      setSelectedCard(null);
    }
  };

  

  return (
   
    <div className="cards-wrapper">
      <div className="cards-container">
       {cardData.map((card, index) => (
        <div 
        key={index}
        className={`card ${selectedCard === index ? 'selected' : ''} ${card.hidden ? 'hidden' : ''}`}
        onClick={() => handleCardClick(index)}
        >
          <h3 className="card-title">{card.title}</h3>
          <p className="card-content">{card.content}</p>
        </div>
      ))}
      
       
      
      </div>
      <div className="buttons-container">
      <button className="play-button" onClick={() => handleButtonClick('play')}>Play</button>
        <button className="cashin-button" onClick={() => handleButtonClick('cash in')}>Cash In</button>
        <button className="discard-button" onClick={() => handleButtonClick('discard')}>Discard</button>

      
      </div>
    </div>
  );
};

export default Cards;