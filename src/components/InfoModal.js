import React, { useState } from 'react';
import '../css/banner.css';
import '../css/themes.css';

const InfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button 
        id="infoButton" 
        onClick={openModal}>
          Info
      </button>
      {isOpen && (
        <div id="infoModal" className="info-modal" onClick={closeModal}>
          <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="info-close-button" onClick={closeModal}>
              &times;
            </span>
            <h2>Scheduling Possibilities</h2>
            <div className="info-description">Look at all possible class schedules with ClassMosaic!</div>
            <ul>
              <li>
                <strong>Stacked:</strong> Scheduling as many classes as possible on the same day to free up other days.
              </li>
              <li>
                <strong>Spaced:</strong> Spreading classes out across the week to reduce daily workload.
              </li>
              <li>
                <strong>Time of Day:</strong> Choosing class times that match your peak energy or focus levels (e.g., morning vs. afternoon).
              </li>
              <li>
                <strong>Balanced:</strong> Mixing hard and easy classes throughout the day or week to manage mental load.
              </li>
              <li>
                <strong>Breaks:</strong> Intentionally leaving gaps between classes for rest, study, or meals. (At least 60 minutes between classes)
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};


export default InfoModal;
