import React from 'react';

const TotalCredits = ({ totalCredits }) => {
  return (
    <div id="total-credits" className="credits-display">
      Total Credits: {totalCredits}
    </div>
  );
};

export default TotalCredits;
