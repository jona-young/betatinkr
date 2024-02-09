import { useState } from 'react';

// takes the current data of workouts at trainingPlan...week[0].workouts
const useSetTrainingBlock = (formData) => {
    const [ form, setForm ] = useState( formData ? formData : {});

    // changes a workout name of a workout within a training block across all weeks
    const handleChangeWorkoutField = (index, workoutIdx, fieldName, updatedValue) => {
        const mesocycleWorkouts = form.blocks[index].weeks.map((week) => {
            let updatedSession = week
            updatedSession.workouts[workoutIdx][fieldName] = updatedValue

            return updatedSession
        })

        const mesocycleBlocks = blocksUpdater(index, mesocycleWorkouts)

        setForm({...form, blocks: mesocycleBlocks})
    }

    const handleChangeActivity = (blockIndex, updatedValue, workoutIdx, activityIndex, weekIndex, templateIndex) => {
        /* template index is utilized when setting up standard workouts across multiple weeks in a single mesocycle
            if attempting to update an individual activity within a single workout, set templateIndex=weekIndex */
        const updatedActivity = { ...form.blocks[blockIndex].weeks[templateIndex].workouts[workoutIdx].activities[activityIndex],
                                    ['name']: updatedValue 
                                }

        const updatedActivities = activitiesUpdater(blockIndex, templateIndex, workoutIdx, activityIndex, updatedActivity)

        const updatedWorkout = { ...form.blocks[blockIndex].weeks[templateIndex].workouts[workoutIdx], 
                                ['activities']: updatedActivities}

        const updatedWorkouts = workoutsUpdater(blockIndex, templateIndex, workoutIdx, updatedWorkout)

        const updatedWeeks = weeksUpdater(blockIndex, weekIndex, updatedWorkouts)

        const updatedBlocks = blocksUpdater(blockIndex, updatedWeeks)

        setForm({...form, blocks: updatedBlocks})
    }

    const handleChangeExercise = (blockIndex, fieldName, updatedValue, workoutIdx, activityIndex, exerciseIndex, weekIndex, templateIndex) => {
        /* template index is utilized when setting up standard workouts across multiple weeks in a single mesocycle
            if attempting to update an individual activity within a single workout, set templateIndex=weekIndex */
        const updatedExercise = { ...form.blocks[blockIndex].weeks[templateIndex].workouts[workoutIdx].activities[activityIndex].exercises[exerciseIndex],
                                    [fieldName]: updatedValue}

        const updatedExercises = form.blocks[blockIndex].weeks[templateIndex].workouts[workoutIdx].activities[activityIndex].exercises.map((exercise, i) => {
            if (i == exerciseIndex) {
                return updatedExercise
            } else {
                return exercise
            }
        })

        const updatedActivity = { ...form.blocks[blockIndex].weeks[templateIndex].workouts[workoutIdx].activities[activityIndex],
                                    ['exercises']: updatedExercises 
                                }

        const updatedActivities = activitiesUpdater(blockIndex, templateIndex, workoutIdx, activityIndex, updatedActivity)

        const updatedWorkout = { ...form.blocks[blockIndex].weeks[templateIndex].workouts[workoutIdx], 
                                ['activities']: updatedActivities}

        const updatedWorkouts = workoutsUpdater(blockIndex, templateIndex, workoutIdx, updatedWorkout)


        const updatedWeeks = weeksUpdater(blockIndex, weekIndex, updatedWorkouts)

        const updatedBlocks = blocksUpdater(blockIndex, updatedWeeks)

        setForm({...form, blocks: updatedBlocks})
    }

    const addActivity = (blockIndex, workoutIdx, weekIndex, templateIndex) => {
        /* template index is utilized when setting up standard workouts across multiple weeks in a single mesocycle
            if attempting to update an individual activity within a single workout, set templateIndex=weekIndex */
        let newActivityList = []
        form.blocks[blockIndex].weeks[templateIndex].workouts[workoutIdx].activities.map((activity) => {
            newActivityList.push(activity)
        })
        newActivityList.push({name: 'New Section', exercises: [{name: 'New Exercise', reps: 0, sets: 0, intensity: 0.00, units: '', rest: 0, restUnits: ''}]})


        const updatedWorkout = { ...form.blocks[blockIndex].weeks[templateIndex].workouts[workoutIdx], 
                                ['activities']: newActivityList}

        const updatedWorkouts = workoutsUpdater(blockIndex, templateIndex, workoutIdx, updatedWorkout)

        const updatedWeeks = weeksUpdater(blockIndex, weekIndex, updatedWorkouts)

        const updatedBlocks = blocksUpdater(blockIndex, updatedWeeks)

        setForm({...form, blocks: updatedBlocks})
    }

    // addExercise
    const addExercise = (blockIndex, workoutIndex, activitiesIndex, weekIndex, templateIndex) => {
        /* template index is utilized when setting up standard workouts across multiple weeks in a single mesocycle
            if attempting to update an individual activity within a single workout, set templateIndex=weekIndex */
        let newExerciseList = []
        form.blocks[blockIndex].weeks[templateIndex].workouts[workoutIndex].activities[activitiesIndex].exercises.map((exercise) => {
            newExerciseList.push(exercise)
        })
        newExerciseList.push({name: 'New Exercise', reps: 0, sets: 0, intensity: 0.00, units: '', rest: 0, restUnits: ''})

        const updatedActivity = { ...form.blocks[blockIndex].weeks[templateIndex].workouts[workoutIndex].activities[activitiesIndex],
                                        ['exercises']: newExerciseList}

        const updatedActivities = activitiesUpdater(blockIndex, templateIndex, workoutIndex, activitiesIndex, updatedActivity)

        const updatedWorkout = { ...form.blocks[blockIndex].weeks[templateIndex].workouts[workoutIndex], 
                                ['activities']: updatedActivities}

        const updatedWorkouts = workoutsUpdater(blockIndex, templateIndex, workoutIndex, updatedWorkout)

        const updatedWeeks = weeksUpdater(blockIndex, weekIndex, updatedWorkouts)

        const updatedBlocks = blocksUpdater(blockIndex, updatedWeeks)

        setForm({...form, blocks: updatedBlocks})
    }

    const handleChangeAllActivities = (blockIndex, workoutIndex, activitiesIndex, value) => {
        for (var i = 0; i < form.blocks[blockIndex].weeks.length; i++) {
            handleChangeActivity(blockIndex, value, workoutIndex, activitiesIndex, i, 0)
        }
    }
    
    const handleChangeAllExercises = (blockIndex, workoutIndex, activityIndex, exerciseIndex, fieldName, updatedValue,) => {
        for (var i = 0; i < form.blocks[blockIndex].weeks.length; i++) {
            handleChangeExercise(blockIndex, fieldName, updatedValue, workoutIndex, activityIndex, exerciseIndex, i, 0)
        }
    }
    
    const handleAddAllActivity = (blockIndex, workoutIndex) => {
        for (var i = 0; i < form.blocks[blockIndex].weeks.length; i++) {
            addActivity(blockIndex, workoutIndex, i, 0)
        }
    }
    
    const handleAddAllExercise = (blockIndex, workoutIndex, activitiesIndex) => {
        for (var i = 0; i < form.blocks[blockIndex].weeks.length; i++) {
            addExercise(blockIndex, workoutIndex, activitiesIndex, i, 0)
        }
    }


    // Reusable function to update form blocks
    const blocksUpdater = (blockIndex, updatedWeeks) => {
        const revisedBlocks = form.blocks.map((block, i) => {
            if (i == blockIndex) {
                let updatedBlock = block
                updatedBlock.weeks = updatedWeeks

                return updatedBlock
            } else {
                return block
            }
        })

        return revisedBlocks
    }

    // Reusable function to updated form weeks
    const weeksUpdater = (blockIndex, weekIndex, updatedWorkouts) => {
        const revisedWeeks = form.blocks[blockIndex].weeks.map((week, i) => {
            if (i == weekIndex) {

                let updatedWeek = week
                updatedWeek.workouts = updatedWorkouts
    
                return updatedWeek
            } else {
                return week
            }
        })

        return revisedWeeks
    }
   
    // Reusable function to update form workouts
    const workoutsUpdater = (blockIndex, weekIndex, workoutIndex, updatedWorkout) => {
        const revisedWorkouts = form.blocks[blockIndex].weeks[weekIndex].workouts.map((workout, i) => {
            if (i == workoutIndex) {
                return updatedWorkout
            } else {
                return workout
            }
        })

        return revisedWorkouts
    }

    const activitiesUpdater = (blockIndex, weekIndex, workoutIndex, activityIndex, updatedActivity) => {
        const revisedActivities = form.blocks[blockIndex].weeks[weekIndex].workouts[workoutIndex].activities.map((activity, i) => {
            if (i == activityIndex) {
                return updatedActivity
            } else {
                return activity
            }
        })

        return revisedActivities
    }

    return { 
        form, 
        handleChangeWorkoutField,
        handleChangeActivity,
        handleChangeExercise,
        addActivity,
        addExercise,
        handleChangeAllActivities,
        handleChangeAllExercises,
        handleAddAllActivity,
        handleAddAllExercise
    }
}

export default useSetTrainingBlock;