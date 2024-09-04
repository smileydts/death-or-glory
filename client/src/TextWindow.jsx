import React, { useState } from 'react';
import './TextWindow.css'; // Import the CSS file

const TextWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputText.trim()) {
      setMessages([...messages, inputText]);
      setInputText('');
    }
  };

  return (
    <div className="container">
      <div className="message-window">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))
        ) : (
          <p>Your messages will appear here...</p>
        )}
      </div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="input-field"
        placeholder="Type a message and press Enter..."
      />
    </div>
  );
};
export default TextWindow;