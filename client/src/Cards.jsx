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

  return (
   
      <div className="cards-container">
       {cardData.map((card, index) => (
        <div key={index} className="card">
          <h3 className="card-title">{card.title}</h3>
          <p className="card-content">{card.content}</p>
        </div>
      ))}
      </div>
    
   
  );
};

export default Cards;