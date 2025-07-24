import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddClassButton from '../components/AddClassButton';
import ClassTable from '../components/ClassTable';
import SaveAllTablesButton from '../components/SaveAllTablesButton';
import TotalCredits from '../components/TotalCredits';
import Banner from '../components/Banner';

const MainPage = ({ classTables, addClassTable, deleteClassTable, maxCredits, setMaxCredits })  => {
	
	const [tablesState, setTablesState] = useState({});
  const navigate = useNavigate();

  
	const setCollectTableData = (id, { collectTableData, validate }) => {
			setTablesState((prev) => ({
				...prev,
				[id]: { collectTableData, validate },
			}));
		};

  
  const saveAllTableData = () => {
    let allValid = true;
    const collectedData = [];

    classTables.forEach((table) => {
			const handlers = tablesState[table.id];
			if (!handlers || !handlers.validate || !handlers.collectTableData) return;

      const isValid = handlers.validate();
      if (!isValid) {
        allValid = false;
      } else {
        const data = handlers.collectTableData();
        collectedData.push(data);
      }
    });

    if (allValid) {
      localStorage.setItem('classData', JSON.stringify(collectedData));
      localStorage.setItem('maxCredits', maxCredits);
			localStorage.setItem('classTables', JSON.stringify(classTables));
      alert('All table data saved successfully!');
			navigate('/SchedulesPage');
      window.location.href = '/SchedulesPage';
    } else {
      alert('Please correct the errors in the form.');
    }
  };

  

  const calculateTotalCredits = () => {
    let totalCredits = 0;
    classTables.forEach((table) => {
			const handlers = tablesState[table.id];
			if (!handlers || !handlers.collectTableData) return;
			const data = handlers.collectTableData();
			totalCredits += parseInt(data.credits, 10) || 0;

    });
    return totalCredits;
  };

  

  return (
    <div>
      <Banner></Banner>
      <div className="new-class">
        <label className="max-credits-label" htmlFor="max-credits">
          Max Semester Credits:
        </label>
        <input
          className="max-credits"
          type="number"
          id="max-credits"
          name="max-credits"
          placeholder="18"
          min="1"
          max="30"
          value={maxCredits}
          onChange={(e) => setMaxCredits(parseInt(e.target.value, 10))}
        />
        <label className="instructions">
          *Input how many credits you want to/can take this semester.
        </label>
      </div>
      <AddClassButton onAddClass={addClassTable} />

      <div className="class-table-container">
        {classTables.map((table, index) => (
          <ClassTable
            key={table.id}
            id={table.id}
            onDelete={deleteClassTable}
            setCollectTableData={setCollectTableData}
						initialData={JSON.parse(localStorage.getItem('classData'))?.[index] || null} />
        ))}
      </div>
      <SaveAllTablesButton onSaveAll={saveAllTableData} />
      <TotalCredits totalCredits={calculateTotalCredits()} />
    </div>
  );
};

export default MainPage;
