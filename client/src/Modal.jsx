import React from 'react';
import './Modal.css'; // Add CSS file for modal styling

const Modal = ({ isVisible, title, message, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>Confirm</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
  );
};

export default Modal;