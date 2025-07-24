import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleDisplay from '../components/ScheduleDisplay';
import ScheduleSelector from '../components/ScheduleSelector';
import GenerateScheduleButton from '../components/GenerateScheduleButton';
import ErrorModal from '../components/ErrorModal';
import { createStackedSchedule } from '../algorithms/stacked';
import { createSpacedSchedule } from '../algorithms/spaced';
import { createTimeOfDaySchedules } from '../algorithms/timeofday';
import { createBreaksSchedule } from '../algorithms/breaks';
import { createBalancedSchedules } from '../algorithms/balanced';
import Banner from '../components/Banner';
import '../css/themes.css';

const SchedulesPage = ({ classData }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('stacked');
  const [schedule, setSchedule] = useState(createStackedSchedule(classData));
  const [title, setTitle] = useState('Stacked Schedule');
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeOfDaySchedules, setTimeOfDaySchedules] = useState(null);
  const [balancedSchedules, setBalancedSchedules] = useState(null);

	const navigate = useNavigate();

  const handleAlgorithmChange = (e) => {
    setSelectedAlgorithm(e.target.value);
  };

  const handleGenerateSchedule = () => {
    let newSchedule;
    let newTitle;
    let newTimeOfDaySchedules = null;
    let newBalancedSchedules = null;

    try {
      switch (selectedAlgorithm) {
        case 'stacked':
          newSchedule = createStackedSchedule(classData);
          newTitle = 'Stacked Schedule';
          break;
        case 'spaced':
          newSchedule = createSpacedSchedule(classData);
          newTitle = 'Spaced Schedule';
          break;
        case 'timeofday':
          newTimeOfDaySchedules = createTimeOfDaySchedules(classData);
          newTitle = 'Time of Day Schedules';
          break;
        case 'breaks':
          newSchedule = createBreaksSchedule(classData).schedule;
          newTitle = 'Breaks Schedule';
          break;
        case 'balanced':
          newBalancedSchedules = createBalancedSchedules(classData);
          newTitle = 'Balanced Schedules';
          break;
        default:
          newSchedule = createStackedSchedule(classData);
          newTitle = 'Stacked Schedule';
      }
      setSchedule(newSchedule);
      setTitle(newTitle);
      setTimeOfDaySchedules(newTimeOfDaySchedules);
      setBalancedSchedules(newBalancedSchedules);
      setErrorMessage(null); // Clear any previous error messages
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const closeModal = () => {
    setErrorMessage(null);
  };

  return (
    <div>
      <Banner>
				<button className="go-back-button"
						onClick={() => navigate('/')}
						style={{
							background: '#00000',
							leftBorder: '#00000',
							borderColor: '#00000',
							color: '#00000',
							fontSize: '15px',
							borderRadius: '8px',
							cursor: 'pointer',
							marginRight: '1rem',
							left: 75,
							fontFamily: 'Arial, Helvetica, sans-serif',
						}}>
						← Go back to class list
					</button>
        <ScheduleSelector
          selectedAlgorithm={selectedAlgorithm}
          onChange={handleAlgorithmChange}
        />
        <GenerateScheduleButton onClick={handleGenerateSchedule} />
      </Banner>
      <ErrorModal show={errorMessage !== null} onClose={closeModal}>
        <div className="error-message">{errorMessage}</div>
      </ErrorModal>
      <div className="schedule-container">
        {timeOfDaySchedules ? (
          <>
            <ScheduleDisplay schedule={timeOfDaySchedules.morningSchedule} title="Morning Schedule" />
            <ScheduleDisplay schedule={timeOfDaySchedules.afternoonSchedule} title="Afternoon Schedule" />
          </>
        ) : balancedSchedules ? (
          <>
            <ScheduleDisplay schedule={balancedSchedules.balancedDaysSchedule} title="Balanced Days Schedule" />
            <ScheduleDisplay schedule={balancedSchedules.balancedWeekSchedule} title="Balanced Week Schedule" />
          </>
        ) : (
          <ScheduleDisplay schedule={schedule} title={title} />
        )}
      </div>
    </div>
  );
};

export default SchedulesPage;
