export const adjustMesoCycleWeeks = (form, blockIndex, weekLen, weekDiff, deloadBool, workoutsPerWeek, newSection, newWeekLen) => {
    let mesoBlockCopy = []
    let nameCounter = 0


    if (weekDiff > 0) {
        if (deloadBool) {
            // grabs all value except the last week (the deload week)
            mesoBlockCopy = form.blocks[blockIndex].weeks.slice(0, form.blocks[blockIndex].weeks.length - 1)
        } else {
            mesoBlockCopy = form.blocks[blockIndex].weeks.slice()
            nameCounter++
        }

        let weekWorkouts = []
        for (let i = 0; i < workoutsPerWeek; i++) {
            weekWorkouts.push({
                name: 'Workout ' + (i + 1),
                activities: [newSection]
            })
        }

        for (let i = 0; i < weekDiff; i++) {
            mesoBlockCopy.push({
                name: "Week " + (weekLen + i + nameCounter),
                workouts: weekWorkouts
            })
        }
    } else if (weekDiff < 0) {
        if (newWeekLen == 1 && deloadBool) {
            mesoBlockCopy = form.blocks[blockIndex].weeks.slice(0, newWeekLen)
        } else if (deloadBool) {
            mesoBlockCopy = form.blocks[blockIndex].weeks.slice(0, form.blocks[blockIndex].weeks.length - 1 + weekDiff)
        } else {
            mesoBlockCopy = form.blocks[blockIndex].weeks.slice(0, form.blocks[blockIndex].weeks.length + weekDiff)
        }

    } else {
        //weekDiff == 0
        return form.blocks[blockIndex].weeks
    }

    if (newWeekLen !== 1 && deloadBool) {
        // create a copy of deload week and add it back to teh new updated weeks array?
        mesoBlockCopy.push(form.blocks[blockIndex].weeks[form.blocks[blockIndex].weeks.length - 1])
    }

    return mesoBlockCopy
}