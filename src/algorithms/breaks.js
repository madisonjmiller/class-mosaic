export function createBreaksSchedule(classData) {
    const maxCredits = parseInt(localStorage.getItem('maxCredits'), 10) || 18;
    const minCredits = 12;
    let schedule = {};
    let currentCredits = 0;

    // Sort classes by start time to create gaps
    const sortedClasses = classData.sort((a, b) => {
        const timeA = parseInt(a.startTime.replace(':', ''), 10);
        const timeB = parseInt(b.startTime.replace(':', ''), 10);
        return timeA - timeB;
    });

    const requiredClasses = sortedClasses.filter(classItem => classItem.needed);
    const nonRequiredClasses = sortedClasses.filter(classItem => !classItem.needed);

    // Function to add a class directly to the schedule
    const addClassToSchedule = (classItem) => {
        const classCredits = parseInt(classItem.credits, 10);
        classItem.days.forEach(day => {
            if (!schedule[day]) {
                schedule[day] = [];
            }
            schedule[day].push(classItem);
        });
        currentCredits += classCredits;
    };

    // Function to attempt to add a class to the schedule
    const tryAddClass = (classItem) => {
        const classCredits = parseInt(classItem.credits, 10);
        if (currentCredits + classCredits <= maxCredits) {
            let added = false;
            classItem.days.forEach(day => {
                if (!schedule[day]) {
                    schedule[day] = [];
                }
                // Check if there is a gap before adding the class
                if (schedule[day].length === 0 || hasMeaningfulGap(schedule[day][schedule[day].length - 1], classItem)) {
                    schedule[day].push(classItem);
                    added = true;
                }
            });
            if (added) {
                currentCredits += classCredits;
            }
        }
    };

    // Add required classes directly
    requiredClasses.forEach(classItem => {
        addClassToSchedule(classItem);
    });

    // Try to add non-required classes until we reach at least minCredits
    nonRequiredClasses.forEach(classItem => {
        if (currentCredits < minCredits) {
            tryAddClass(classItem);
        }
    });

    // Continue adding non-required classes to get as close to maxCredits as possible
    nonRequiredClasses.forEach(classItem => {
        if (currentCredits < maxCredits) {
            tryAddClass(classItem);
        }
    });

    return { schedule, currentCredits };
}

// Helper function to check if there is a meaningful gap (at least 60 minutes) between two classes
function hasMeaningfulGap(previousClass, currentClass) {
    const previousEndTime = toMinutes(previousClass.endTime);
    const currentStartTime = toMinutes(currentClass.startTime);
    return currentStartTime - previousEndTime >= 60; // 60 minutes gap
}

// Helper function to convert time string (HH:MM) to minutes
function toMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}
