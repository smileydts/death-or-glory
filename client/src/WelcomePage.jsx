import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

function WelcomePage() {
  const [playerName, setPlayerName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleButtonClick = () => {
    // Set welcome message and prepare to submit
    setWelcomeMessage(`Welcome, ${playerName}!`);
    setIsSubmitted(true);

    // Now, make the API call to register the player
    fetch(`${import.meta.env.VITE_API_URL}/api/join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playerName })
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the player_id is returned in the data
        document.cookie = `player_id=${data.player_id}; path=/`; // Sets a cookie for the player_id
        navigate('/game'); // Navigate to the game page
    })
    .catch(error => {
        console.error('Error joining game:', error);
        alert('Failed to join the game, please try again!'); // Simple error feedback
    });
  };

  const handleNavigate = () => {
    navigate('/game'); // Navigate to the new page
  };

  return (
    <div className="WelcomePage">
      <h1>Death or Glory</h1>
      {!isSubmitted ? (
        <>
          <div>Enter Player Name</div>
          <input type="text" onChange={handleInputChange} />
          <button onClick={handleButtonClick}>Submit</button>
        </>
      ) : (
        <>
          <div className="welcomemessage">{welcomeMessage}</div>
          <div>
            <button className="JoinGame" onClick={handleNavigate}>
              Join Game
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default WelcomePage;
