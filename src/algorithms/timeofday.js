export function createTimeOfDaySchedules(classData) {
    const maxCredits = parseInt(localStorage.getItem('maxCredits'), 10) || 18;

    let morningSchedule = {};
    let afternoonSchedule = {};

    let currentMorningCredits = 0;
    let currentAfternoonCredits = 0;

    const addClassToSchedule = (classItem, schedule, currentCredits) => {
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
        return currentCredits;
    };

    classData.forEach(classItem => {
        const classCredits = parseInt(classItem.credits, 10);
        const isMorningClass = classItem.startTime < '12:00';

        if (classItem.needed) {
            currentMorningCredits = addClassToSchedule(classItem, morningSchedule, currentMorningCredits);
            currentAfternoonCredits = addClassToSchedule(classItem, afternoonSchedule, currentAfternoonCredits);

        } else {
            if (isMorningClass && currentMorningCredits + classCredits <= maxCredits) {
                currentMorningCredits = addClassToSchedule(classItem, morningSchedule, currentMorningCredits);
            } else if (!isMorningClass && currentAfternoonCredits + classCredits <= maxCredits) {
                currentAfternoonCredits = addClassToSchedule(classItem, afternoonSchedule, currentAfternoonCredits);
            }
        }
    });

    const addClosestClassesFromOppositeTime = (isMorningSchedule) => {
        let sortedClasses = classData
            .filter(c => ((isMorningSchedule && c.startTime >= '12:00') || (!isMorningSchedule && c.startTime < '12:00')))
            .sort((a, b) => {
                const timeA = parseInt(a.startTime.replace(':', ''), 10);
                const timeB = parseInt(b.startTime.replace(':', ''), 10);
                return isMorningSchedule ? timeA - timeB : timeB - timeA;
            });

        while ((isMorningSchedule ? currentMorningCredits : currentAfternoonCredits) < maxCredits && sortedClasses.length > 0) {
            const classItem = sortedClasses.shift();
            const classCredits = parseInt(classItem.credits, 10);

            if (isMorningSchedule && currentMorningCredits + classCredits <= maxCredits) {
                currentMorningCredits = addClassToSchedule(classItem, morningSchedule, currentMorningCredits);
            } else if (!isMorningSchedule && currentAfternoonCredits + classCredits <= maxCredits) {
                currentAfternoonCredits = addClassToSchedule(classItem, afternoonSchedule, currentAfternoonCredits);
            }
        }
    };

    if (currentMorningCredits < maxCredits) {
        addClosestClassesFromOppositeTime(true);
    }

    if (currentAfternoonCredits < maxCredits) {
        addClosestClassesFromOppositeTime(false);
    }

    return { morningSchedule, afternoonSchedule, currentMorningCredits, currentAfternoonCredits };
}
