import React, { useState } from 'react';
import './css/alert.css';

const Alert = ({ title, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false); 
  };

  if (!isVisible) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-card">
        <button className="alert-close-button" onClick={handleClose}>
          X
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" fill='red' width="60" height="60" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm9 12c0 1.94-.624 3.735-1.672 5.207l-12.535-12.535c1.472-1.048 3.267-1.672 5.207-1.672 4.962 0 9 4.038 9 9zm-18 0c0-1.94.624-3.735 1.672-5.207l12.534 12.534c-1.471 1.049-3.266 1.673-5.206 1.673-4.962 0-9-4.038-9-9z"/></svg>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;