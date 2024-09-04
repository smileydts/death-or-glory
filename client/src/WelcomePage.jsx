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
        localStorage.setItem('playerName', playerName);
        setWelcomeMessage(`Welcome, ${playerName}!`);
        setIsSubmitted(true);
    };

    const handleNavigate = () => {
        navigate('/game'); // Navigate to the new page
    };

return (
    <div className="WelcomePage">
        <h1>Death or Glory</h1>
        {!isSubmitted ? (
            <>
        <div>
            Enter Player Name
        </div>
        <input type="text" onChange={handleInputChange} />
        <button onClick={handleButtonClick}>
                Submit
            </button>
            </>
        ) : (
            <>
            <div className="welcomemessage">
                {welcomeMessage}
             </div>
                <div>
                <button className="JoinGame" onClick={handleNavigate}>Join Game</button>
                </div>
                </>
        )}
    </div>
);
}

export default WelcomePage
