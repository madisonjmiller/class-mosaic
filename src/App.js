import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Schedulespage from './pages/Schedulespage'
import ThemeSelector from './components/ThemeSelector';


const App = () => {
  const [classData, setClassData] = useState([]);
  const [classTables, setClassTables] = useState([]);
  const [maxCredits, setMaxCredits] = useState(18);

  useEffect(() => {
    // Retrieve class data from localStorage or a JSON file
		const savedData = JSON.parse(localStorage.getItem('classData')) || [];
    const savedTables = JSON.parse(localStorage.getItem('classTables')) || [];
    const savedCredits = parseInt(localStorage.getItem('maxCredits'), 10) || 18;

    setClassData(savedData);
    setClassTables(savedTables);
    setMaxCredits(savedCredits);
  }, []);

  const addClassTable = () => {
    const newTable = {
      id: Math.random().toString(36).substr(2, 16),
    };
    
		const updatedTables = [...classTables, newTable];
    setClassTables(updatedTables);
    localStorage.setItem('classTables', JSON.stringify(updatedTables));

  };

  
	const deleteClassTable = (id) => {
			const updatedTables = classTables.filter((table) => table.id !== id);
			setClassTables(updatedTables);
			localStorage.setItem('classTables', JSON.stringify(updatedTables));

			
	const savedData = JSON.parse(localStorage.getItem('classData')) || [];

		// Find the index of the table being deleted
		const indexToRemove = classTables.findIndex((table) => table.id === id);

		if (indexToRemove !== -1) {
			savedData.splice(indexToRemove, 1);
			localStorage.setItem('classData', JSON.stringify(savedData));
		}

	};

  /*
	const calculateTotalCredits = (tables) => {
			let totalCredits = 0;
			const seenCourses = new Set();

			tables.forEach((table) => {
				if (!table.collectTableData) return;
				const tableData = table.collectTableData();
				const courseId = tableData.courseId || tableData.id;

				if (!seenCourses.has(courseId)) {
					seenCourses.add(courseId);
					totalCredits += parseInt(tableData.credits, 10) || 0;
				}
			});

    return totalCredits;
  };*/

  return (
    <Router>
      <ThemeSelector />
      <Routes>
        <Route
          path="/"
          element={<MainPage
						classTables={classTables}
						addClassTable={addClassTable}
						deleteClassTable={deleteClassTable}
						maxCredits={maxCredits}
 						setMaxCredits={setMaxCredits}
					/>}
        />
        <Route
        path="/Schedulespage"
        element={<Schedulespage classData={classData} />}
        />
      </Routes>
    </Router>
  );
};

export default App;