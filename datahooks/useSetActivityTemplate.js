import { useState } from 'react';

const newExercise = {name: 'New Exercise', reps: 0, sets: 0, intensity: 0.00, units: '', rest: 0, restUnits: ''}
const newSection = {name: 'New Section', exercises: [newExercise]}

// data hook for user activity templates
const useSetActivityTemplate = (formData) => {
    const [ form, setForm ] = useState( formData ? formData : [newSection]);

    const handleChangeActivityName = (activityIndex, updatedValue) => {
        const updatedActivity = { ...form[activityIndex],
                                    ['name']: updatedValue}

        const updatedActivities = form.map((activity, i) => {
            if (i == activityIndex) {
                return updatedActivity
            } else {
                return activity
            }
        })

        setForm(updatedActivities)
    }

    const handleChangeExercise = (activityIndex, exerciseIndex, fieldName, updatedValue) => {
        const updatedExercise = { ...form[activityIndex].exercises[exerciseIndex],
                                    [fieldName]: updatedValue}

        const updatedExercises = form[activityIndex].exercises.map((exercise, i) => {
            if (i == exerciseIndex) {
                return updatedExercise
            } else {
                return exercise
            }
        })

        const updatedActivities = singleStatesUpdater(form, activityIndex, 'exercises', updatedExercises)

        setForm(updatedActivities)
    }

    const addActivity = () => {
        let updatedActivities = []
        form.map((activity) => {
            updatedActivities.push(activity)
        })

        updatedActivities.push(newSection)

        setForm(updatedActivities)
    }

    const removeActivity = (activityIndex) => {
        if (form.length > 1) {
            let updatedActivities = []
            form.map((activity, idx) => {
                if (idx !== activityIndex) {
                    updatedActivities.push(activity)
                }
            })

            setForm(updatedActivities)
        }
    }

    // addExercise
    const addExercise = (activityIndex) => {
        let updatedExercises = []
        form[activityIndex].exercises.map((exercise) => {
            updatedExercises.push(exercise)
        })
        updatedExercises.push(newExercise)

        const updatedActivities = singleStatesUpdater(form, activityIndex, 'exercises', updatedExercises)

        setForm(updatedActivities)
    }

    // removeExercise
    const removeExercise = (activityIndex, exerciseIndex) => {
        if (form[activityIndex].exercises.length > 1) {
            let updatedExercises = []
            form[activityIndex].exercises.map((exercise, idx) => {
                if (idx !== exerciseIndex) {
                    updatedExercises.push(exercise)
                }
            })
    
            const updatedActivities = singleStatesUpdater(form, activityIndex, 'exercises', updatedExercises)
    
            setForm(updatedActivities)
        }

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

    return { 
        form, 
        handleChangeActivityName,
        handleChangeExercise,
        addActivity,
        removeActivity,
        addExercise,
        removeExercise,
    }
}

export default useSetActivityTemplate;