import React, { useState, useEffect } from 'react';

const ClassTable = ({ id, onDelete, setCollectTableData, initialData }) => {
  
	const [className, setClassName] = useState(initialData?.className || '');
  const [instructor, setInstructor] = useState(initialData?.instructor || '');
  const [startTime, setStartTime] = useState(initialData?.startTime || '');
  const [endTime, setEndTime] = useState(initialData?.endTime || '');
  const [difficultyRating, setDifficultyRating] = useState(initialData?.difficultyRating || null);
  const [credits, setCredits] = useState(initialData?.credits || '');
  const [days, setDays] = useState(initialData?.days || []);
  const [needed, setNeeded] = useState(initialData?.needed || false);
  const [errors, setErrors] = useState({
    className: false,
    days: false,
    time: false,
    credits: false,
  });

  const [isAsynchronous, setIsAsynchronous] = useState(initialData?.days?.includes('Online Asynchronous') || false);

  const collectTableData = () => {
    return {
      className,
      instructor,
      startTime,
      endTime,
      difficultyRating,
      credits,
      days,
      needed,
    };
  };

  const validate = () => {
  const newErrors = {
    className: className.trim() === '',
    days: days.length === 0,
    time: isAsynchronous ? false : (startTime === '' || endTime === ''),
    credits: credits === '',
  };

  setErrors(newErrors);
  return !Object.values(newErrors).some(Boolean);
};


  const handleDaysChange = (e) => {
    const { value, checked } = e.target;
    
    if (value === 'Online Asynchronous') {
      setDays(checked ? ['Online Asynchronous'] : []);
      setIsAsynchronous(checked);
      if (checked) {
        setStartTime('');
        setEndTime('');
      }
    } else {
      setDays((prev) => {
        const filtered = prev.filter((day) => day !== 'Online Asynchronous');
        return checked ? [...filtered, value] : prev.filter((day) => day !== value);
      });
      setIsAsynchronous(false);
    }
  };


  useEffect(() => {
    setCollectTableData(id, {
      collectTableData,
      validate,
    });
		// eslint-disable-next-line
  }, [className, instructor, startTime, endTime, difficultyRating, credits, days, needed]);


  return (
    <div className="class-table-wrapper" data-table-id={id}>
      <table className="class-table">
        <thead>
          <tr>
            <th>Class Name *</th>
            <th>Days of the Week *</th>
            <th>Time *</th>
            <th>Instructor</th>
            <th>Difficulty Prediction (1-5)</th>
            <th>Credits *</th>
            <th>Required this semester?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input 
                type="text"
                placeholder="Enter class name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
              />
              {errors.className && (
                  <div className="name-error" style={{ color: 'red' }}>
                    Please name the class.
                  </div>
                )}
            </td>
            <td className="days-container">
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'start' }}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <label key={day}>
                    <input
                      type="checkbox"
                      name="days"
                      value={day}
                      checked={days.includes(day)}
                      onChange={handleDaysChange}
                    />
                    {day.slice(0, 3)}
                  </label>
                ))}
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
                <input
                    type="checkbox"
                    name="days"
                    value="Online Asynchronous"
                    checked={days.includes('Online Asynchronous')}
                    onChange={handleDaysChange}
                  />
                  Online Asynchronous
              </label>
              {errors.days && (
                <div className="days-error" style={{ color: 'red' }}>
                  Please select at least one day.
                </div>
              )}
            </td>
            <td>
              <input
                type="time"
                placeholder="Start time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required={!isAsynchronous}
                disabled={isAsynchronous}
                style={{ backgroundColor: isAsynchronous ? '#e0e0e0' : 'white' }}
                step="300"
              />
              <span> to </span>
              <input
                type="time"
                placeholder="End time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required={!isAsynchronous}
                disabled={isAsynchronous}
                style={{ backgroundColor: isAsynchronous ? '#e0e0e0' : 'white' }}
                step="300"
              />
              {errors.time && !isAsynchronous && (
                <div className="time-error" style={{ color: 'red' }}>
                  Please input class times.
                </div>
              )}
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter instructor"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="1"
                value={difficultyRating}
                onChange={(e) => setDifficultyRating(e.target.value)}
                min="1"
                max="5"
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="3"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                min="1"
                max="5"
                required
              />
              {errors.credits && (
                <div className="credits-error" style={{ color: 'red' }}>
                  Please enter the number of credits.
                </div>
              )}
            </td>
            <td>
              <label>
                <input
                  type="checkbox"
                  name="needed"
                  value="needed"
                  checked={needed}
                  onChange={(e) => setNeeded(e.target.checked)}
                />{' '}
                Yes
              </label>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="table-actions">
        <button className="delete-table-button" onClick={() => onDelete(id)}>
          Delete Class
        </button>
      </div>
    </div>
  );
};


export default ClassTable;
