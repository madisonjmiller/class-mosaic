// src/algorithms/balanced.js

// Helper function to preprocess classData
const preprocessClassData = (classData) => {
    return classData.map(classItem => ({
        ...classItem,
        difficultyRating: classItem.difficultyRating === undefined || classItem.difficultyRating === '' ? null : classItem.difficultyRating
    }));
};

// Helper function to check if all classes have difficulty levels filled out
const areDifficultyLevelsFilled = (classData) => {
    console.log("Checking difficulty levels for classData:", classData);
    const allFilled = classData.every(classItem => classItem.difficultyRating !== null);
    console.log("Are all difficulty levels filled?", allFilled);
    return allFilled;
};

// Helper function to classify classes into hard and easy categories
const classifyClasses = (classData) => {
    const hardClasses = [];
    const easyClasses = [];
    classData.forEach(classItem => {
        if (classItem.difficultyRating >= 3) {
            hardClasses.push(classItem);
        } else {
            easyClasses.push(classItem);
        }
    });
    return { hardClasses, easyClasses };
};

// Helper function to add a class to the schedule with credit tracking
const addClassToSchedule = (classItem, schedule, currentCredits, maxCredits) => {
    const classCredits = parseInt(classItem.credits, 10);
    if (currentCredits + classCredits <= maxCredits) {
        classItem.days.forEach(day => {
            if (!schedule[day]) {
                schedule[day] = [];
            }
            schedule[day].push(classItem);
        });
        return currentCredits + classCredits;
    }
    return currentCredits;
};

// Function to create a balanced schedule for each day
const createBalancedDaysSchedule = (classData, maxCredits) => {
    const requiredClasses = classData.filter(classItem => classItem.needed);
    const nonRequiredClasses = classData.filter(classItem => !classItem.needed);
    const { hardClasses, easyClasses } = classifyClasses(nonRequiredClasses);
    let schedule = {};
    let currentCredits = 0;

    requiredClasses.forEach(classItem => {
        currentCredits = addClassToSchedule(classItem, schedule, currentCredits, maxCredits);
    });

    hardClasses.forEach(classItem => {
        currentCredits = addClassToSchedule(classItem, schedule, currentCredits, maxCredits);
    });

    easyClasses.forEach(classItem => {
        currentCredits = addClassToSchedule(classItem, schedule, currentCredits, maxCredits);
    });

    return { schedule, currentCredits };
};

// Function to create a balanced schedule for the entire week
const createBalancedWeekSchedule = (classData, maxCredits) => {
    const requiredClasses = classData.filter(classItem => classItem.needed);
    const nonRequiredClasses = classData.filter(classItem => !classItem.needed);
    const { hardClasses, easyClasses } = classifyClasses(nonRequiredClasses);
    let schedule = {};
    let currentCredits = 0;

    // Initialize the schedule with empty arrays for each day
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    days.forEach(day => {
        schedule[day] = [];
    });

    // Add required classes first
    requiredClasses.forEach(classItem => {
        currentCredits = addClassToSchedule(classItem, schedule, currentCredits, maxCredits);
    });

    // Add hard classes to their respective days
    hardClasses.forEach(classItem => {
        currentCredits = addClassToSchedule(classItem, schedule, currentCredits, maxCredits);
    });

    // Add easy classes to their respective days
    easyClasses.forEach(classItem => {
        currentCredits = addClassToSchedule(classItem, schedule, currentCredits, maxCredits);
    });

    return { schedule, currentCredits };
};

// Main function to create both balanced day and week schedules
export function createBalancedSchedules(classData) {
    console.log("Creating balanced schedules with classData:", classData);
    
    // Preprocess classData to ensure difficultyRating is null if undefined or empty
    const preprocessedClassData = preprocessClassData(classData);
    console.log("Preprocessed classData:", preprocessedClassData);

    if (!areDifficultyLevelsFilled(preprocessedClassData)) {
        console.error("Error: Missing difficulty ratings in classData");
        throw new Error('Please fill out difficulty levels for all classes to generate a balanced schedule.');
    }

    const maxCredits = parseInt(localStorage.getItem('maxCredits'), 10) || 18;

    const balancedDaysResult = createBalancedDaysSchedule(preprocessedClassData, maxCredits);
    const balancedWeekResult = createBalancedWeekSchedule(preprocessedClassData, maxCredits);

    return { balancedDaysSchedule: balancedDaysResult.schedule, balancedWeekSchedule: balancedWeekResult.schedule };
}
