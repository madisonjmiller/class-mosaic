import React from 'react';
import '../css/ScheduleDisplay.css';

const ScheduleDisplay = ({ schedule, title }) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  let totalCredits = 0;
  const seenClasses = new Set();
  const onlineClasses = schedule['Online Asynchronous'] || [];

  daysOfWeek.forEach(day => {
    const classesForDay = schedule[day] || [];
    classesForDay.forEach(classItem => {
      if (!seenClasses.has(classItem.className)) {
        seenClasses.add(classItem.className);
        totalCredits += parseInt(classItem.credits, 10);
      }
    });
  });

  onlineClasses.forEach(classItem => {
    if (!seenClasses.has(classItem.className)) {
      seenClasses.add(classItem.className);
      totalCredits += parseInt(classItem.credits, 10);
    }
  });

  const classColorMap = new Map();
  const usedHues = new Set();
  const MIN_HUE_DISTANCE = 30; // Minimum distance between hues

  const hashStringToHue = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 360);
  };

  const getClassBorderColor = (className) => {
    // Check if the color for this class has already been determined
    if (classColorMap.has(className)) {
      return classColorMap.get(className);
    }

    let hue = hashStringToHue(className);

    // Ensure the hue is sufficiently different from previously used hues
    while (isHueTooClose(hue)) {
      hue = (hue + MIN_HUE_DISTANCE) % 360;
    }

    // Add the chosen hue to the set of used hues
    usedHues.add(hue);

    const color = `hsl(${hue}, 90%, 50%)`;
    classColorMap.set(className, color);

    return color;
  };

  const isHueTooClose = (hue) => {
    for (let usedHue of usedHues) {
      if (Math.abs(usedHue - hue) < MIN_HUE_DISTANCE) {
        return true;
      }
    }
    return false;
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hour, minute] = timeStr.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="algorithm-schedule-container">
      <h2>{title}</h2>
      <div className="schedule-content">
        <table className="schedule-table">
          <thead>
            <tr>
              {daysOfWeek.map(day => <th key={day}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              {daysOfWeek.map(day => (
                <td key={day}>
                  {(schedule[day] || [])
                    .sort((a, b) => new Date(`1970/01/01 ${a.startTime}`) - new Date(`1970/01/01 ${b.startTime}`))
                    .map((classItem, index) => (
                      <div
                        key={`${classItem.className}-${index}`}
                        className="class-item-card"
                        style={{ borderLeft: `6px solid ${getClassBorderColor(classItem.className)}` }}
                      >
                        <div className="class-title">{classItem.className}</div>
                        <div className="class-time">{formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}</div>
                        <div className="class-instructor">Professor {classItem.instructor || 'TBD'}</div>
                        {classItem.difficultyRating && <div className="class-difficulty">Difficulty: {classItem.difficultyRating}/5</div>}
                        <div className="class-credits">{classItem.credits} credits</div>
                        {classItem.needed && <div className="required-tag">Required</div>}
                      </div>
                    ))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="online-classes">
          <h3>Online Asynchronous Classes</h3>
          {onlineClasses.map((classItem, index) => (
            <div
              key={`${classItem.className}-${index}`}
              className="class-item-card"
              style={{ borderLeft: `6px solid ${getClassBorderColor(classItem.className)}` }}
            >
              <div className="class-title">{classItem.className}</div>
              <div className="class-instructor">Professor {classItem.instructor || 'TBD'}</div>
              {classItem.difficultyRating && <div className="class-difficulty">Difficulty: {classItem.difficultyRating}/5</div>}
              <div className="class-credits">{classItem.credits} credits</div>
              {classItem.needed && <div className="required-tag">Required</div>}
            </div>
          ))}
        </div>
      </div>
      <div id="total-credits" className="credits-display">
        Total Credits: {totalCredits}
      </div>
    </div>
  );
};

export default ScheduleDisplay;
