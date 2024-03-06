import { create } from 'zustand'
import _ from 'lodash'
import { formatDateAddStartDate, formatDateAddStartDatePlusOne } from '../components/helpers/adjustTrainingCycleDates';
import { adjustMesoCycleWeeks } from '../components/helpers/adjustMesoCycleWeeks';
import { adjustWeekWorkouts } from '../components/helpers/adjustWeekWorkouts';

const newExercise = {name: 'New Exercise', reps: 0, sets: 0, intensity: 0.00, units: '', rest: 0, restUnits: ''}
const newSection = {name: 'New Section', exercises: [newExercise]}

export const useTrainingStore = create((set) => ({
    trainingPlans: [],
    activityTemplates: [],
    updateTrainingPlans: (data) => set((state) => ({trainingPlans: data})),
    updateActivityTemplates: (data) => set((state) => ({activityTemplates: data}))
}))

export const getPlanCopy = (indices) => {
    const plans = useTrainingStore.getState().trainingPlans

    return _.cloneDeep(plans[indices.planIndex])
}

// TrainingPlan -> Deload YES/NO button, adapts mesocycle deload week
export const handleChangeDeload = (axiosContext, planIndex, blockIndex, navigation) => {
    const [ trainingPlans, trainingPlan, trainingBlocks, trainingBlock] 
        = dataSetChunks([planIndex, 'blocks', blockIndex])
    const deloadBool = !(trainingBlock.deload)
    const workoutsPerWeek = trainingBlock.weeks[0].workouts.length

    let blockCopy = []

    // depending on deload week, will add or remove a deload week and its number of workouts
    if (deloadBool) {
        blockCopy = trainingBlock.weeks.slice()

        let weekWorkouts = []
        for (let i = 0; i < workoutsPerWeek; i++) {
            weekWorkouts.push({
                name: 'Workout ' + (i + 1),
                activities: newSection
            })
        }

        blockCopy.push({
            name: "Deload Week",
            workouts: weekWorkouts
        })
    } else {
        if (trainingBlock.weeks.length > 1) {
            blockCopy = trainingBlock.weeks.slice(0, trainingBlock.weeks.length - 1)
        } else {
            blockCopy = trainingBlock.weeks.slice()
        }
    }

    // weekshift counter
    let weekShiftCounter = 0
    
    // react docs array state update
    const updatedBlocks = trainingPlan.blocks.map((block, i) => {
        if (i == blockIndex) {
            weekShiftCounter += block.weeks.length

            let updatedBlock = block
            updatedBlock.weeks = blockCopy
            updatedBlock.deload = deloadBool

            if (deloadBool) {
                weekShiftCounter++
            } else {
                weekShiftCounter--
            }

            updatedBlock.endDate = formatDateAddStartDate(trainingPlan.startDate, weekShiftCounter)

            return updatedBlock
        // handle start/end date changes for any blocks after the block with block index was changed
        } else if (i > blockIndex) { 
            let updatedBlock = block

            // date parsers to transform timestamp into date with offset time according to user timezone
            // const formattedDatePair = followingDatesParse(updatedBlock.startDate, updatedBlock.endDate, deloadBool)
            // updatedBlock.startDate = formattedDatePair[0]
            // updatedBlock.endDate = formattedDatePair[1]

            updatedBlock.startDate = formatDateAddStartDatePlusOne(trainingPlan.startDate, weekShiftCounter)

            weekShiftCounter += block.weeks.length

            updatedBlock.endDate = formatDateAddStartDate(trainingPlan.startDate, weekShiftCounter)

            return updatedBlock
        } else {
            weekShiftCounter += block.weeks.length

            return block
        }
    })

    // react docs array state update
    const updatedPlans = singleStatesUpdater(trainingPlans, planIndex, 'blocks', updatedBlocks)
   
    useTrainingStore.setState((state) => ({ trainingPlans: updatedPlans }))

    return axiosContext.putTrainingPlan(updatedPlans[planIndex], navigation, '#')
}

// TrainingPlan -> X Weeks, adapts number of weeks in Mesocycle
export const handleChangeWeeks = (axiosContext, planIndex, blockIndex, weeks, navigation) => {
    const [ trainingPlans, trainingPlan, trainingBlocks, trainingBlock ] 
        = dataSetChunks([planIndex, 'blocks', blockIndex])
    const weekLen = trainingBlock.weeks.length
    const weekDiff = weeks - weekLen
    const deloadBool = trainingBlock.deload
    const workoutsPerWeek = trainingBlock.weeks[0].workouts.length

    // takes into account a deload week and adds or removes weeks to a mesocycle and returns array
    const adjustedMesocycle = adjustMesoCycleWeeks(trainingPlan, blockIndex, weekLen, weekDiff, deloadBool, workoutsPerWeek, newSection, weeks)

    // weekshift counter
    let weekShiftCounter = 0
    // react docs array state update
    const updatedBlocks = trainingPlan.blocks.map((block, i) => {
        if (i == blockIndex) {
            let updatedBlock = block
            updatedBlock.weeks = adjustedMesocycle

            if (weeks == 1 && deloadBool) {
                updatedBlock.deload = !updatedBlock.deload
            }

            weekShiftCounter += weeks
            updatedBlock.endDate = formatDateAddStartDate(trainingPlan.startDate, weekShiftCounter)

            return updatedBlock

        //handle start/end date changes for any blocks after a the block with block index was changed
        } else if (i > blockIndex) {
            let updatedBlock = block

            updatedBlock.startDate = formatDateAddStartDatePlusOne(trainingPlan.startDate, weekShiftCounter)

            weekShiftCounter += block.weeks.length

            updatedBlock.endDate = formatDateAddStartDate(trainingPlan.startDate, weekShiftCounter)

            return updatedBlock
        } else {
            weekShiftCounter += block.weeks.length
            return block
        }
    })

    // react docs array state update
    const updatedPlans = singleStatesUpdater(trainingPlans, planIndex, 'blocks', updatedBlocks)
    
    useTrainingStore.setState((state) => ({ trainingPlans: updatedPlans }))

    return axiosContext.putTrainingPlan(updatedPlans[planIndex], navigation, '#')
}

// changes the number of workouts in a given training week
export const handleChangeWorkouts = (axiosContext, planIndex, blockIndex, weekIndex, workoutNum, navigation) => {
    const [ trainingPlans, trainingPlan, trainingBlocks, trainingBlock, trainingWeeks] 
        = dataSetChunks([planIndex, 'blocks', blockIndex, 'weeks'])
    const workoutLen = trainingWeeks[weekIndex].workouts.length
    const workoutDiff = workoutNum - workoutLen
    const deloadBool = trainingBlock.deload

    // changes the number of workouts in a week given a mesocycle block index and the specific week index to change
    const adjustedWorkouts = adjustWeekWorkouts(trainingWeeks[weekIndex].workouts, workoutDiff, deloadBool)

    // series of react docs array state update
    updatedWeeksToPlans([trainingWeeks, trainingBlocks, trainingPlans], [weekIndex, blockIndex, planIndex], ['workouts', 'weeks', 'blocks'], adjustedWorkouts, navigation, axiosContext)

    return
}

export const handleCopyBlock = (axiosContext, planIndex, blockIndex, templateBlockIndex, navigation, Alert) => {
    const [ trainingPlans, trainingPlan, trainingBlocks] 
        = dataSetChunks([planIndex, 'blocks'])
    
    if (trainingPlan.blocks[blockIndex].weeks.length !== trainingPlan.blocks[templateBlockIndex].weeks.length) {
        return Alert.alert('The current training block does not have the same amount of weeks as the past training block!')
    }
    
    const templateWeeks = _.cloneDeep(trainingBlocks[templateBlockIndex].weeks)
    
    const updatedBlocks = trainingBlocks.map((block, idx) => {
        if (idx == blockIndex) {
            let updatedBlock = block
            updatedBlock.weeks = templateWeeks

            return updatedBlock
        } else {
            return block
        }
    })

    const updatedPlans = singleStatesUpdater(trainingPlans, planIndex, 'blocks', updatedBlocks)

    useTrainingStore.setState((state) => ({ trainingPlans: updatedPlans }))

    return axiosContext.putTrainingPlan(updatedPlans[planIndex], navigation, '#')
}

export const handleCopyWorkout = (axiosContext, planIndex, blockIndex, weekIndex, workoutIndex, overloadValue, navigation) => {
    const templateWeekIndex = weekIndex - 1
    const [ trainingPlans, trainingPlan, trainingBlocks, trainingBlock, trainingWeeks, trainingWeek, 
        trainingWorkouts, trainingWorkout ] 
        = dataSetChunks([planIndex, 'blocks', blockIndex, 'weeks', weekIndex, 'workouts', workoutIndex])

    // get workout from the week before
    const templateActivities = _.cloneDeep(trainingWeeks[templateWeekIndex].workouts[workoutIndex].activities)

    const updatedActivities = templateActivities.map((section, idx) => {
        let updatedSection = section

        // loop through exercises the the exercises' values to update depending on overload value
        const updatedExercises = section.exercises.map((exercise) => {
            let updatedExercise = exercise
            updatedExercise.intensity = (updatedExercise.intensity * overloadValue).toFixed(2)

            return updatedExercise
        })

        updatedSection.exercises = updatedExercises

        return updatedSection
    })

    const updatedWorkouts = trainingWorkouts.map((workout, idx) => {
        if (idx == workoutIndex) {
            let updatedWorkout = workout
            updatedWorkout.activities = updatedActivities

            return updatedWorkout
        } else {
            return workout
        }
    })

    updatedWeeksToPlans([trainingWeeks, trainingBlocks, trainingPlans], [weekIndex, blockIndex, planIndex], ['workouts', 'weeks', 'blocks'], updatedWorkouts, navigation, axiosContext)
    
    return
}

// changes a workout name of a workout within a training block across all weeks
export const handleChangeWorkoutField = (axiosContext, planIndex, blockIndex, workoutIndex, name, value, navigation) => {
    const [ trainingPlans, trainingPlan, trainingBlocks, trainingBlock, trainingWeeks ] 
        = dataSetChunks([planIndex, 'blocks', blockIndex, 'weeks'])

    // series of react docs array state update
    const blockWeeks = trainingWeeks.map((week) => {
        let updatedWorkout = week

        updatedWorkout.workouts[workoutIndex][name] = value
        return updatedWorkout
    })
    const updatedBlocks = singleStatesUpdater(trainingBlocks, blockIndex, 'weeks', blockWeeks)
    const updatedPlans = singleStatesUpdater(trainingPlans, planIndex, 'blocks', updatedBlocks)

    useTrainingStore.setState((state) => ({ trainingPlans: updatedPlans }))

    return axiosContext.putTrainingPlan(updatedPlans[planIndex], navigation, '#')
}

// changes the activity section name
export const handleChangeActivity = (axiosContext, planIndex, blockIndex, weekIndex, templateIndex, workoutIndex, activityIndex, fieldName, value, navigation) => {
    const [ trainingPlans, trainingPlan, trainingBlocks, trainingBlock, trainingWeeks, trainingWeek, 
        trainingWorkouts, trainingWorkout, trainingActivities ] 
        = dataSetChunks([planIndex, 'blocks', blockIndex, 'weeks', templateIndex, 'workouts',
                    workoutIndex, 'activities'])

    // series of react docs array state update
    const updatedActivity = { ...trainingActivities[activityIndex], [fieldName]: value }
    const updatedActivities = allStatesUpdater(trainingActivities, activityIndex, updatedActivity)
    const updatedWorkout = { ...trainingWorkout, ['activities']: updatedActivities }
    const updatedWorkouts = allStatesUpdater(trainingWorkouts, workoutIndex, updatedWorkout)

    updatedWeeksToPlans([trainingWeeks, trainingBlocks, trainingPlans], [weekIndex, blockIndex, planIndex], ['workouts', 'weeks', 'blocks'], updatedWorkouts, navigation, axiosContext)

    return
}

export const handleUpdateExercise = (axiosContext, planIndex, blockIndex, weekIndex, templateIndex, workoutIndex, activityIndex, exerciseIndex, updatedExercise, navigation) => {
    /* template index is utilized when setting up standard workouts across multiple weeks in a single mesocycle
    if attempting to update an individual activity within a single workout, set templateIndex=weekIndex
    when calling the function */
    const [ trainingPlans, trainingPlan, trainingBlocks, trainingBlock, trainingWeeks, trainingWeek, 
        trainingWorkouts, trainingWorkout, trainingActivities, trainingActivity, trainingExercises ] 
        = dataSetChunks([planIndex, 'blocks', blockIndex, 'weeks', templateIndex, 'workouts',
                    workoutIndex, 'activities', activityIndex, 'exercises'])
    
    // series of react docs array state update
    const updatedExercises = allStatesUpdater(trainingExercises, exerciseIndex, updatedExercise)
    const updatedActivity = { ...trainingActivities[activityIndex], ['exercises']: updatedExercises }
    const updatedActivities = allStatesUpdater(trainingActivities, activityIndex, updatedActivity)
    const updatedWorkout = { ...trainingWorkout, ['activities']: updatedActivities }
    const updatedWorkouts = allStatesUpdater(trainingWorkouts, workoutIndex, updatedWorkout)
    
    updatedWeeksToPlans([trainingWeeks, trainingBlocks, trainingPlans], [weekIndex, blockIndex, planIndex], ['workouts', 'weeks', 'blocks'], updatedWorkouts, navigation, axiosContext)

    return
}



export const replaceActivity = (axiosContext, planIndex, blockIndex, weekIndex, workoutIndex, activityIndex, updatedActivity, navigation) => {
    const [ trainingPlans, trainingPlan, trainingBlocks, trainingBlock, trainingWeeks, trainingWeek, 
        trainingWorkouts, trainingWorkout, trainingActivities ] 
        = dataSetChunks([planIndex, 'blocks', blockIndex, 'weeks', weekIndex, 'workouts',
                    workoutIndex, 'activities'])
    
    const updatedActivities = allStatesUpdater(trainingActivities, activityIndex, updatedActivity)
    const updatedWorkout = { ...trainingWorkout, ['activities']: updatedActivities }
    const updatedWorkouts = allStatesUpdater(trainingWorkouts, workoutIndex, updatedWorkout)

    updatedWeeksToPlans([trainingWeeks, trainingBlocks, trainingPlans], [weekIndex, blockIndex, planIndex], ['workouts', 'weeks', 'blocks'], updatedWorkouts, navigation, axiosContext)

    return
}

// add a new activity section within an individual workout
export const addActivity = (axiosContext, planIndex, blockIndex, weekIndex, templateIndex, workoutIndex, navigation, blankCopy, insertActivity) => {
    /* template index is utilized when setting up standard workouts across multiple weeks in a single mesocycle
        if attempting to update an individual activity within a single workout, set templateIndex=weekIndex
        when calling the function */
    const [ trainingPlans, trainingPlan, trainingBlocks, trainingBlock, trainingWeeks, trainingWeek, 
        trainingWorkouts, trainingWorkout, trainingActivities ] 
        = dataSetChunks([planIndex, 'blocks', blockIndex, 'weeks', templateIndex, 'workouts',
                    workoutIndex, 'activities'])

    let activityList = trainingActivities.slice()

    if (blankCopy) {
        activityList.push(newSection)
    } else {
        activityList.push(insertActivity)
    }

    const updatedWorkout = { ...trainingWorkout, ['activities']: activityList }
    const updatedWorkouts = allStatesUpdater(trainingWorkouts, workoutIndex, updatedWorkout)
    
    updatedWeeksToPlans([trainingWeeks, trainingBlocks, trainingPlans], [weekIndex, blockIndex, planIndex], ['workouts', 'weeks', 'blocks'], updatedWorkouts, navigation, axiosContext)

    return
}

// add a new activity section within an individual workout
export const removeActivity = (axiosContext, planIndex, blockIndex, weekIndex, templateIndex, workoutIndex, activityIndex, navigation) => {
    /* template index is utilized when setting up standard workouts across multiple weeks in a single mesocycle
        if attempting to update an individual activity within a single workout, set templateIndex=weekIndex
        when calling the function */
    const [ trainingPlans, trainingPlan, trainingBlocks, trainingBlock, trainingWeeks, trainingWeek, 
        trainingWorkouts, trainingWorkout, trainingActivities ] 
        = dataSetChunks([planIndex, 'blocks', blockIndex, 'weeks', templateIndex, 'workouts',
                    workoutIndex, 'activities'])

    const activityList = trainingActivities.filter((activity, idx) => {
        if (idx !== activityIndex) {
            return activity
        }
    })

    const updatedWorkout = { ...trainingWorkout, ['activities']: activityList }
    const updatedWorkouts = allStatesUpdater(trainingWorkouts, workoutIndex, updatedWorkout)
    
    updatedWeeksToPlans([trainingWeeks, trainingBlocks, trainingPlans], [weekIndex, blockIndex, planIndex], ['workouts', 'weeks', 'blocks'], updatedWorkouts, navigation, axiosContext)

    return
}

export const addExercise = (axiosContext, planIndex, blockIndex, weekIndex, templateIndex, workoutIndex, activityIndex, navigation) => {
    /* template index is utilized when setting up standard workouts across multiple weeks in a single mesocycle
        if attempting to update an individual activity within a single workout, set templateIndex=weekIndex
        when calling the function */
    const [ trainingPlans, trainingPlan, trainingBlocks, trainingBlock, trainingWeeks, trainingWeek, 
        trainingWorkouts, trainingWorkout, trainingActivities, trainingActivity, trainingExercises ] 
        = dataSetChunks([planIndex, 'blocks', blockIndex, 'weeks', templateIndex, 'workouts',
                    workoutIndex, 'activities', activityIndex, 'exercises'])

    let exerciseList = trainingExercises.slice()
    exerciseList.push(newExercise)

    const updatedActivity = { ...trainingActivities[activityIndex], ['exercises']: exerciseList }
    const updatedActivities = allStatesUpdater(trainingActivities, activityIndex, updatedActivity)
    const updatedWorkout = { ...trainingWorkout, ['activities']: updatedActivities }
    const updatedWorkouts = allStatesUpdater(trainingWorkouts, workoutIndex, updatedWorkout)
    
    updatedWeeksToPlans([trainingWeeks, trainingBlocks, trainingPlans], [weekIndex, blockIndex, planIndex], ['workouts', 'weeks', 'blocks'], updatedWorkouts, navigation, axiosContext)

    return
}

export const removeExercise = (axiosContext, planIndex, blockIndex, weekIndex, templateIndex, workoutIndex, activityIndex, exerciseIndex, navigation) => {
    /* template index is utilized when setting up standard workouts across multiple weeks in a single mesocycle
        if attempting to update an individual activity within a single workout, set templateIndex=weekIndex
        when calling the function */
    const [ trainingPlans, trainingPlan, trainingBlocks, trainingBlock, trainingWeeks, trainingWeek, 
        trainingWorkouts, trainingWorkout, trainingActivities, trainingActivity, trainingExercises ] 
        = dataSetChunks([planIndex, 'blocks', blockIndex, 'weeks', templateIndex, 'workouts',
                    workoutIndex, 'activities', activityIndex, 'exercises'])

    const exerciseList = trainingExercises.filter((exercise, idx) => {
        if (idx !== exerciseIndex) {
            return exercise
        }
    })

    const updatedActivity = { ...trainingActivities[activityIndex], ['exercises']: exerciseList }
    const updatedActivities = allStatesUpdater(trainingActivities, activityIndex, updatedActivity)
    const updatedWorkout = { ...trainingWorkout, ['activities']: updatedActivities }
    const updatedWorkouts = allStatesUpdater(trainingWorkouts, workoutIndex, updatedWorkout)

    updatedWeeksToPlans([trainingWeeks, trainingBlocks, trainingPlans], [weekIndex, blockIndex, planIndex], ['workouts', 'weeks', 'blocks'], updatedWorkouts, navigation, axiosContext)

    return
}

// Reusable function to return arrays within drilled down data structure
const updatedWeeksToPlans = (mapSet, indicesArray, fieldArray, updatedWorkouts, navigation, axiosContext) => {
    let previousDataSet
    let updatedData = updatedWorkouts
    for (let i = 0; i < mapSet.length; i++) {
        previousDataSet = singleStatesUpdater(mapSet[i], indicesArray[i], fieldArray[i], updatedData)
        updatedData = previousDataSet
    }
    
    useTrainingStore.setState((state) => ({ trainingPlans: updatedData }))

    return axiosContext.putTrainingPlan(updatedData[indicesArray[indicesArray.length - 1]], navigation, '#')
}

// Reusable function to updated a single matching index data instance with a supplied field name and data
const singleStatesUpdater = (mapSet, componentIndex, fieldName, updatedSubState) => {
    const revisedState = mapSet.map((individualState, i) => {
        if (i == componentIndex) {
            let updatedState = individualState
            updatedState[fieldName] = updatedSubState

            return updatedState
        } else {
            return individualState
        }
    })

    return revisedState
}

// Reusable function to update the individual data instance given a matching index
const allStatesUpdater = (mapSet, componentIndex, updatedSubState) => {
    const revisedState = mapSet.map((individualState, i) => {
        if (i == componentIndex) {
            return updatedSubState
        } else {
            return individualState
        }
    })

    return revisedState
}

// Reusable function to return arrays within drilled down data structure
const dataSetChunks = (fieldNameArray) => {
    let dataArray = []
    const trainingPlans = useTrainingStore.getState().trainingPlans
    dataArray.push(trainingPlans)

    let dataSet = trainingPlans
    for(let i = 0; i < fieldNameArray.length; i++) {
        dataSet = dataSet[fieldNameArray[i]]
        dataArray.push(dataSet)
    }

    return dataArray
}