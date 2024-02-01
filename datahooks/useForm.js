import { useState } from 'react';
import { selectedDateParse, followingDatesParse, selectedDateDiffParse, followingDatesDiffParse } from '../components/helpers/adjustTrainingCycleDates';
import { adjustMesoCycleWeeks } from '../components/helpers/adjustMesoCycleWeeks';
import { adjustWeekWorkouts } from '../components/helpers/adjustWeekWorkouts';

const useForm = (formData) => {
    const [ form, setForm ] = useState( formData ? formData : { 
        name: '',
        startDate: '',
        endDate: '',
        activityType: '',
        weeksPerBlock: 4,
        deloadWeek: false,
        workoutsPerWeek: 3,
        blocks: []
    });

    const handleChange = (name, value) => {
        setForm({...form, [name]: value})
    }

    // Changes form on FormTrainingPlan which is a precursor to set deload weeks for all macrocycles
    const handleChangeDeloadWeek = () => {
        const newBool = !form.deloadWeek
        setForm({...form, ['deloadWeek']: newBool})
    }

    // changes a mesocycles individual deload week
    const handleChangeDeload = (blockIndex) => {
        const intendedDeloadBool = !form.blocks[blockIndex].deload
        const workoutsPerWeek = form.blocks[blockIndex].weeks[0].workouts.length

        let mesoBlockCopy = []
        // remove/add deload
        if (intendedDeloadBool) {
            mesoBlockCopy = form.blocks[blockIndex].weeks.slice()
            
            let weekWorkouts = []
            for (let i = 0; i < workoutsPerWeek; i++) {
               weekWorkouts.push({
                    name: 'Workout ' + (i + 1),
                    activities: [{name: 'New Section', exercises: [{name: 'New Exercise', reps: 0, sets: 0, intensity: 0.00, units: '', rest: 0}]}]
                })
            }

            mesoBlockCopy.push({
                name: "Deload Week",
                workouts: weekWorkouts,
            })
        } else {
                mesoBlockCopy = form.blocks[blockIndex].weeks.slice(0, form.blocks[blockIndex].weeks.length - 1)
        }

        // update state with deload reverse and the addition/removal of deload week in weeks
        const updatedBlocks = form.blocks.map((block, i) => {
            if (i == blockIndex) {
                let updatedBlock = block
                updatedBlock.weeks = mesoBlockCopy
                updatedBlock.deload = intendedDeloadBool

                updatedBlock.endDate = selectedDateParse(updatedBlock.endDate, intendedDeloadBool)

                return updatedBlock
            } else if (i > blockIndex) {
                //handle start/end date changes for any blocks after a the block with block index was changed
                let updatedBlock = block

                const formattedDatePair = followingDatesParse(updatedBlock.startDate, updatedBlock.endDate, intendedDeloadBool)
                updatedBlock.startDate = formattedDatePair[0]
                updatedBlock.endDate = formattedDatePair[1]

                return updatedBlock
            } else {
                return block
            }
        })

        

        setForm({...form, blocks: updatedBlocks})
    }

    // changes the number of weeks in an individual mesocycle
    const handleMesoChangeWeek = (blockIndex, _weeks) => {
        const weekLen = form.blocks[blockIndex].weeks.length
        const weekDiff = _weeks - weekLen
        const deloadBool = form.blocks[blockIndex].deload
        const workoutsPerWeek = form.blocks[blockIndex].weeks[0].workouts.length

        const adjustedMesocycle = adjustMesoCycleWeeks(form, blockIndex, weekLen, weekDiff, deloadBool, workoutsPerWeek)

        const updatedBlocks = form.blocks.map((block, i) => {
            if (i == blockIndex) {
                let updatedBlock = block
                updatedBlock.weeks = adjustedMesocycle

                //parse date, then apply add/subtract functions
                updatedBlock.endDate = selectedDateDiffParse(updatedBlock.endDate, weekDiff)

                return updatedBlock
            } else if (i > blockIndex) {
                let updatedBlock = block

                const formattedDatePair = followingDatesDiffParse(updatedBlock.startDate, updatedBlock.endDate, weekDiff)
                updatedBlock.startDate = formattedDatePair[0]
                updatedBlock.endDate = formattedDatePair[1]

                return updatedBlock
            } else {
                return block
            }
        })

        setForm({...form, blocks: updatedBlocks})
    }

    // changes the number of workouts per week in an individual training week
    const handleWeekChangeWorkouts = (blockIndex, weekIndex, value) => {
        const workoutLen = form.blocks[blockIndex].weeks[weekIndex].workouts.length
        const workoutDiff = value - workoutLen
        const deloadBool = form.blocks[blockIndex].deload

        // changes the number of workouts in a week given a mesocycle block index and the specific week index to change
        const adjustedWorkouts = adjustWeekWorkouts(form.blocks[blockIndex].weeks[weekIndex].workouts, workoutDiff, deloadBool)

        const updatedWeeks = weeksUpdater(blockIndex, weekIndex, adjustedWorkouts)

        const updatedBlocks = blocksUpdater(blockIndex, updatedWeeks)

        setForm({...form, blocks: updatedBlocks})
    }

    // changes a workout name of a workout within a training block across all weeks
    const handleChangeWorkout = (index, updatedValue, workoutIdx, fieldName) => {
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

    const addActivity = (index, workoutIdx, weekIndex, templateIndex) => {
        /* template index is utilized when setting up standard workouts across multiple weeks in a single mesocycle
            if attempting to update an individual activity within a single workout, set templateIndex=weekIndex */
        let newActivityList = []
        form.blocks[index].weeks[templateIndex].workouts[workoutIdx].activities.map((activity) => {
            newActivityList.push(activity)
        })
        newActivityList.push({name: 'New Section', exercises: [{name: 'New Exercise', reps: 0, sets: 0, intensity: 0.00, units: '', rest: 0, restUnits: ''}]})


        const updatedWorkout = { ...form.blocks[index].weeks[templateIndex].workouts[workoutIdx], 
                                ['activities']: newActivityList}

        const updatedWorkouts = workoutsUpdater(blockIndex, templateIndex, workoutIdx, updatedWorkout)

        const updatedWeeks = weeksUpdater(index, weekIndex, updatedWorkouts)

        const updatedBlocks = blocksUpdater(index, updatedWeeks)

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

        const updatedActivities = activitiesUpdater(blockIndex, templateIndex, workoutIdx, activityIndex, updatedActivity)

        const updatedWorkout = { ...form.blocks[blockIndex].weeks[templateIndex].workouts[workoutIndex], 
                                ['activities']: updatedActivities}

        const updatedWorkouts = workoutsUpdater(blockIndex, templateIndex, workoutIndex, updatedWorkout)

        const updatedWeeks = weeksUpdater(blockIndex, weekIndex, updatedWorkouts)

        const updatedBlocks = blocksUpdater(blockIndex, updatedWeeks)

        setForm({...form, blocks: updatedBlocks})
    }

    const handleChangeAllActivities = (blockIndex, value, workoutIndex, activitiesIndex) => {
        for (var i = 0; i < form.blocks[blockIndex].weeks.length; i++) {
            handleChangeActivity(blockIndex, value, workoutIndex, activitiesIndex, i, 0)
        }
    }
    
    const handleChangeAllExercises = (blockIndex, fieldName, updatedValue, workoutIdx, activityIndex, exerciseIndex) => {
        for (var i = 0; i < form.blocks[blockIndex].weeks.length; i++) {
            handleChangeExercise(blockIndex, fieldName, updatedValue, workoutIdx, activityIndex, exerciseIndex, i, 0)
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

    const handleUpdateExercise = (blockIndex, updatedExercise, workoutIdx, activityIndex, exerciseIndex, weekIndex, templateIndex) => {
        /* template index is utilized when setting up standard workouts across multiple weeks in a single mesocycle
            if attempting to update an individual activity within a single workout, set templateIndex=weekIndex */

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
        handleChange, 
        handleChangeDeloadWeek,
        handleChangeDeload,
        handleMesoChangeWeek,
        handleWeekChangeWorkouts,
        handleChangeWorkout,
        handleChangeActivity,
        handleChangeExercise,
        addActivity,
        addExercise,
        handleChangeAllActivities,
        handleChangeAllExercises,
        handleAddAllActivity,
        handleAddAllExercise,
        handleUpdateExercise
    }
}

export default useForm