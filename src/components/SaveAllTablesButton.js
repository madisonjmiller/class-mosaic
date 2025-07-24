import React from 'react';

const SaveAllTablesButton = ({ onSaveAll }) => {
  return (
    <div className="global-actions">
      <button className="save-all-tables-button" onClick={onSaveAll}>
        Save All Classes
      </button>
    </div>
  );
};

export default SaveAllTablesButton;
