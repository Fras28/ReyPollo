import React from 'react';
import './Spinner.css'; // Asegúrate de ajustar la ruta correcta

const Spinner = ({ imageUrl, width = '200px', height = '200px' }) => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container" style={{ width, height }}>
        <img src={imageUrl} alt="spinner" className="spinner-image" />
      </div>
    </div>
  );
};

export default Spinner;
