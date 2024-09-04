import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import { usePlayer } from './PlayerContext';

function WelcomePage() {
  const { setPlayerId } = usePlayer();
  const [playerName, setPlayerName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleJoinButtonClick = () => {

    setWelcomeMessage(`Welcome, ${playerName}!`);
    setIsSubmitted(true);

    // register the player
    fetch(`${import.meta.env.VITE_API_URL}/api/join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playerName })
    })
    .then(response => response.json())
    .then(data => {
        setPlayerId(data.player_id);
        navigate('/game');
    })
    .catch(error => {
        console.error('Error joining game:', error);
        alert('Failed to join the game, please try again!');
    });
  };


  const handleNavigate = () => {
    navigate('/game'); // Navigate to the new page, not sure if we still need this
  };

  return (
    <div className="WelcomePage">
      <h1>Death or Glory</h1>
      {!isSubmitted ? (
        <>
          <div>Enter Player Name</div>
          <input type="text" onChange={handleInputChange} />
          <button onClick={handleJoinButtonClick}>Submit</button>
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
