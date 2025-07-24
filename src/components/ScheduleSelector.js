import React from 'react';

const ScheduleSelector = ({ selectedAlgorithm, onChange }) => {
  return (
    <div className="schedule-dropdown-container">
      <label className="schedule-dropdown-label" htmlFor="algorithm-select">
        Schedule Style:
      </label>
      <select
        className="schedule-dropdown"
        id="algorithm-select"
        value={selectedAlgorithm}
        onChange={onChange}
      >
        <option value="balanced">Balanced</option>
        <option value="breaks">Breaks</option>
        <option value="spaced">Spaced</option>
        <option value="stacked">Stacked</option>
        <option value="timeofday">Time of Day</option>
      </select>
    </div>
  );
};

export default ScheduleSelector;
