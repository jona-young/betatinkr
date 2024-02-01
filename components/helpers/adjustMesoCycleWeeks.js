export const adjustMesoCycleWeeks = (form, blockIndex, weekLen, weekDiff, deloadBool, workoutsPerWeek) => {
    let mesoBlockCopy = []
    let nameCounter = 0


    if (weekDiff > 0) {
        if (deloadBool) {
            mesoBlockCopy = form.blocks[blockIndex].weeks.slice(0, form.blocks[blockIndex].weeks.length - 1)
        } else {
            mesoBlockCopy = form.blocks[blockIndex].weeks.slice()
            nameCounter++
        }

        let weekWorkouts = []
        for (let i = 0; i < workoutsPerWeek; i++) {
            weekWorkouts.push({
                name: 'Workout ' + (i + 1),
                activities: [{name: 'New Section', exercises: [{name: 'New Exercise', reps: 0, sets: 0, intensity: 0.00, units: '', rest: 0, restUnits: ''}]}]
            })
        }

        for (let i = 0; i < weekDiff; i++) {
            mesoBlockCopy.push({
                name: "Week " + (weekLen + i + nameCounter),
                workouts: weekWorkouts
            })
        }
    } else if (weekDiff < 0) {
        if (deloadBool) {
            mesoBlockCopy = form.blocks[blockIndex].weeks.slice(0, form.blocks[blockIndex].weeks.length - 1 + weekDiff)
        } else {
            mesoBlockCopy = form.blocks[blockIndex].weeks.slice(0, form.blocks[blockIndex].weeks.length + weekDiff)
        }

    } else {
        //weekDiff == 0
        return form.blocks[blockIndex].weeks
    }

    if (deloadBool) {
        // create a copy of deload week and add it back to teh new updated weeks array?
        mesoBlockCopy.push(form.blocks[blockIndex].weeks[form.blocks[blockIndex].weeks.length - 1])
    }

    return mesoBlockCopy
}