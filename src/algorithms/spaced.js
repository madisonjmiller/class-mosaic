export function createSpacedSchedule(classData) {
    const maxCredits = parseInt(localStorage.getItem('maxCredits'), 10) || 18;

    let currentCredits = 0;
    const schedule = {};
    const addedClassIds = new Set();

    // Helper function to add class to the schedule
    const addClassToSchedule = (classItem) => {
        let classAdded = false;
        classItem.days.forEach(day => {
            if (!schedule[day]) {
                schedule[day] = [];
            }
            schedule[day].push(classItem);
            if (!classAdded) {
                currentCredits += parseInt(classItem.credits, 10);
                classAdded = true;
            }
        });
        addedClassIds.add(classItem.className);
    };

    // Separate required and optional classes
    const requiredClasses = classData.filter(c => c.needed);
    const optionalClasses = classData.filter(c => !c.needed);

    
    // Step 1: Add required classes
    requiredClasses.forEach(classItem => {
        const classCredits = parseInt(classItem.credits, 10);
        if (currentCredits + classCredits <= maxCredits && !addedClassIds.has(classItem.className)) {
            addClassToSchedule(classItem);
        }
    });

    // Step 2: Sort optional classes to spread on new days
    while (currentCredits < maxCredits && optionalClasses.length > 0) {
        const currentDays = new Set(Object.keys(schedule));

        // Re-sort based on current schedule to prefer classes that add new days
        optionalClasses.sort((a, b) => {
            const score = (classItem) => {
                let overlap = 0;
                let newDays = 0;
                classItem.days.forEach(day => {
                    if (currentDays.has(day)) overlap++;
                    else newDays++;
                });
                const totalScore = newDays * 10 - overlap;

                return totalScore;
            };
            return score(b) - score(a);
        });

        const nextClass = optionalClasses.shift();
        const classCredits = parseInt(nextClass.credits, 10);
        const willFit = currentCredits + classCredits <= maxCredits;
        const alreadyAdded = addedClassIds.has(nextClass.className);

        if (willFit && !alreadyAdded) {
            addClassToSchedule(nextClass);
        } 
    }

    return schedule;
}
