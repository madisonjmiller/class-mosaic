import React from 'react';

const GenerateScheduleButton = ({ onClick }) => {
  return (
    <button id="generate-schedule-button" onClick={onClick}>
      Generate Schedule
    </button>
  );
};

export default GenerateScheduleButton;
