export const adjustWeekWorkouts = (workouts, workoutDiff, deloadBool) => {
    let workoutCopy = workouts.slice()

    // add workouts to a given week
    if (workoutDiff > 0) {

        for (let i = 0; i < workoutDiff; i++) {
            workoutCopy.push({
                name: 'Workout ' + ((workouts.length) + i + 1),
                activities: workoutCopy[workoutCopy.length - 1].activities
            })
        }

    // remove workouts to a given week
    } else if (workoutDiff < 0) {
        for (let i = 0; i < (workoutDiff * -1); i++) {
            workoutCopy.pop()
        }
    // workouts stay the same
    } else {
        //workoutDiff == 0
        return workoutCopy
    }

    return workoutCopy
}