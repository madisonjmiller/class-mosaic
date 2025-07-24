import React from 'react';

const AddClassButton = ({ onAddClass }) => {
  return (
    <button className="add-class-button" onClick={onAddClass}>
      Add Class +
    </button>
  );
};

export default AddClassButton;
