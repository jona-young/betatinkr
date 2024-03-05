import { create } from 'zustand'
import _ from 'lodash'

const newExercise = {name: 'New Exercise', reps: 0, sets: 0, intensity: 0.00, units: '', rest: 0, restUnits: ''}

export const useActivityTemplateStore = create((set) => ({
    activityTemplates: [],
    updateActivityTemplates: (data) => set((state) => ({activityTemplates: data}))
}))

export const getTemplateCopy = (indices) => {
    const templates = useActivityTemplateStore.getState().activityTemplates

    return _.cloneDeep(templates[indices.activityIndex])
}

// changes the activity section name
export const handleChangeActivityName = (axiosContext, activityIndex, value, navigation) => {
    const activityTemplate = getTemplateCopy({ activityIndex: activityIndex})
    const updatedActivity = { ...activityTemplate, ['name']: value}
    const updatedActivities = useActivityTemplateStore.getState().activityTemplates.map((activity, idx) => {
        if (idx == activityIndex) {
            return updatedActivity
        } else {
            return activity
        }
    })

    useActivityTemplateStore.setState((state) => ({ activityTemplates: updatedActivities }))

    return axiosContext.putActivityTemplate(updatedActivity, activityIndex, navigation, '#')
}

export const handleUpdateExercise = (axiosContext, activityIndex, exerciseIndex, updatedExercise, navigation) => {
    const activityTemplate = getTemplateCopy({ activityIndex: activityIndex})

    const updatedExercises = activityTemplate.exercises.map((exercise, idx) => {
        if (idx == exerciseIndex) {
            return updatedExercise
        } else {
            return exercise
        }
    })

    const updatedActivity = { ...activityTemplate, exercises: updatedExercises}

    const updatedActivities = useActivityTemplateStore.getState().activityTemplates.map((activity, idx) => {
        if (idx == activityIndex) {
            return updatedActivity
        } else {
            return activity
        }
    })

    useActivityTemplateStore.setState((state) => ({ activityTemplates: updatedActivities }))

    return axiosContext.putActivityTemplate(updatedActivity, activityIndex, navigation, '#')
}

export const addExercise = (axiosContext, activityIndex, navigation) => {
    const activityTemplate = getTemplateCopy({ activityIndex: activityIndex})
    let exerciseList = activityTemplate.exercises.slice()
    exerciseList.push(newExercise)

    const updatedActivity = { ...activityTemplate, exercises: exerciseList}
    const updatedActivities = useActivityTemplateStore.getState().activityTemplates.map((activity, idx) => {
        if (idx == activityIndex) {
            return updatedActivity
        } else {
            return activity
        }
    })

    useActivityTemplateStore.setState((state) => ({ activityTemplates: updatedActivities }))

    return axiosContext.putActivityTemplate(updatedActivity, activityIndex, navigation, '#')
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
    const trainingPlans = useActivityTemplateStore.getState().activityTemplates
    dataArray.push(trainingPlans)

    let dataSet = trainingPlans
    for(let i = 0; i < fieldNameArray.length; i++) {
        dataSet = dataSet[fieldNameArray[i]]
        dataArray.push(dataSet)
    }

    return dataArray
}