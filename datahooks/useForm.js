import { useState } from 'react';
import { parse, addWeeks, subDays, isBefore, format} from 'date-fns';

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

    // index refers to the mesocycle block within the training plan
    const handleChangeWorkout = (index, updatedValue, workoutIdx, fieldName) => {
        // updates the workout across all weeks in a mesocycle based off the workout index within a single week
        const mesocycleWorkouts = form.blocks[index].weeks.map((week) => {
            let updatedSession = week
            updatedSession.workouts[workoutIdx][fieldName] = updatedValue

            return updatedSession
        })

        // updates the mesocycle blocks based off the index, otherwise returns the unchanged blocks
        const mesocycleBlocks = form.blocks.map((block, i) => {
            if (i == index) {
                let updatedBlock = block
                updatedBlock.weeks = mesocycleWorkouts

                return updatedBlock
            } else {
                return block
            }
        })

        setForm({...form, blocks: mesocycleBlocks})
    }

    const handleChangeActivity = (blockIndex, updatedValue, workoutIdx, activityIndex) => {
        const updatedActivity = { ...form.blocks[blockIndex].weeks[0].workouts[workoutIdx].activities[activityIndex],
                                    ['name']: updatedValue 
                                }

        const updatedActivities = form.blocks[blockIndex].weeks[0].workouts[workoutIdx].activities.map((activity, i) => {
            if (i == activityIndex) {
                return updatedActivity
            } else {
                return activity
            }
        })

        const updatedWorkout = { ...form.blocks[blockIndex].weeks[0].workouts[workoutIdx], 
                                ['activities']: updatedActivities}
        
        const updatedWorkouts = form.blocks[blockIndex].weeks[0].workouts.map((workout, i) => {
            if (i == workoutIdx) {
                return updatedWorkout
            } else {
                return workout
            }
        })

        const updatedWeeks = form.blocks[blockIndex].weeks.map((week, i) => {
            if (i == 0) {
                let updatedWeek = week
                updatedWeek.workouts = updatedWorkouts

                return updatedWeek
            } else {
                return week
            }
        })

        const updatedBlocks = form.blocks.map((block, i) => {
            if (i == blockIndex) {
                let updatedBlock = block
                updatedBlock.weeks = updatedWeeks

                return updatedBlock
            } else {
                return block
            }
        })

        setForm({...form, blocks: updatedBlocks})
    }

    const handleChangeExercise = (blockIndex, fieldName, updatedValue, workoutIdx, activityIndex, exerciseIndex) => {
        const updatedExercise = { ...form.blocks[blockIndex].weeks[0].workouts[workoutIdx].activities[activityIndex].exercises[exerciseIndex],
                                    [fieldName]: updatedValue}

        const updatedExercises = form.blocks[blockIndex].weeks[0].workouts[workoutIdx].activities[activityIndex].exercises.map((exercise, i) => {
            if (i == exerciseIndex) {
                return updatedExercise
            } else {
                return exercise
            }
        })

        const updatedActivity = { ...form.blocks[blockIndex].weeks[0].workouts[workoutIdx].activities[activityIndex],
                                    ['exercises']: updatedExercises 
                                }

        const updatedActivities = form.blocks[blockIndex].weeks[0].workouts[workoutIdx].activities.map((activity, i) => {
            if (i == activityIndex) {
                return updatedActivity
            } else {
                return activity
            }
        })

        const updatedWorkout = { ...form.blocks[blockIndex].weeks[0].workouts[workoutIdx], 
                                ['activities']: updatedActivities}
        
        const updatedWorkouts = form.blocks[blockIndex].weeks[0].workouts.map((workout, i) => {
            if (i == workoutIdx) {
                return updatedWorkout
            } else {
                return workout
            }
        })

        const updatedWeeks = form.blocks[blockIndex].weeks.map((week, i) => {
            if (i == 0) {
                let updatedWeek = week
                updatedWeek.workouts = updatedWorkouts

                return updatedWeek
            } else {
                return week
            }
        })

        const updatedBlocks = form.blocks.map((block, i) => {
            if (i == blockIndex) {
                let updatedBlock = block
                updatedBlock.weeks = updatedWeeks

                return updatedBlock
            } else {
                return block
            }
        })

        setForm({...form, blocks: updatedBlocks})
    }

    // identifies the length of a training block mesocycle and creates the number of blocks
    // within the confines of the start and end date entered by user previously
    const createTrainingCycles = (weeksPerBlock, deload, workoutsPerWeek, handleUpdate) => {
        let start = parse(form.startDate, "yyyy-MM-dd", new Date())
        const end = parse(form.endDate, "yyyy-MM-dd", new Date())

        let mesoBlockLen
        let wPB = parseInt(weeksPerBlock)
        let wPW = parseInt(workoutsPerWeek)
        deload ? mesoBlockLen = wPB + 1 : mesoBlockLen = wPB

        let trainingCycles = []
        let mesoCount = 1
        
        // while loop always creates a start date equal to or past the end date
        while (isBefore(start, end))
        {
            let _workouts = []
            for (let i = 0; i < wPW; i++) {
                _workouts.push({
                    name: 'Workout ' + (i + 1),
                    activities: [{name: 'New Section', exercises: [{name: 'New Exercise', reps: 0, sets: 0, intensity: 0.00, units: '', rest: 0}]}]
                })
            }

            let weeks = []
            for (let i = 0; i < mesoBlockLen; i++) {
                let weekNum = i + 1

                if (deload == true && i == mesoBlockLen - 1) {
                    weeks.push({ 
                        name: 'Week ' + weekNum + " - Deload", 
                        workouts: _workouts
                    })
                } else {
                    weeks.push({ 
                        name: 'Week ' + weekNum,
                        workouts: _workouts
                    })
                }
            }

            trainingCycles.push({
                name: 'Mesocycle ' + mesoCount.toString(),
                startDate: format(start, "yyyy-MM-dd"),
                endDate: format(subDays(addWeeks(start, mesoBlockLen), 1), "yyyy-MM-dd"),
                deload: deload,
                weeks: weeks
            })
            start = addWeeks(start, mesoBlockLen)
            mesoCount++;
        }

        // set the last training cycle's end date to the end date that the user provided
        trainingCycles[trainingCycles.length -1].endDate = format(end, "yyyy-MM-dd")

        handleUpdate('blocks', trainingCycles)

        return
    }

    const addActivity = (index, workoutIdx) => {
        // updates the workout across all weeks in a mesocycle based off the workout index within a single week
        let newActivityList = []
        form.blocks[index].weeks[0].workouts[workoutIdx].activities.map((activity) => {
            newActivityList.push(activity)
        })
        newActivityList.push({name: 'New Section', exercises: [{name: 'New Exercise', reps: 0, sets: 0, intensity: 0.00, units: '', rest: 0}]})


        const updatedWorkout = { ...form.blocks[index].weeks[0].workouts[workoutIdx], 
                                ['activities']: newActivityList}
        
        const updatedWorkouts = form.blocks[index].weeks[0].workouts.map((workout, i) => {
            if (i == workoutIdx) {
                return updatedWorkout
            } else {
                return workout
            }
        })

        const updatedWeeks = form.blocks[index].weeks.map((week, i) => {
            if (i == 0) {
                let updatedWeek = week
                updatedWeek.workouts = updatedWorkouts

                return updatedWeek
            } else {
                return week
            }
        })

        const updatedBlocks = form.blocks.map((block, i) => {
            if (i == index) {
                let updatedBlock = block
                updatedBlock.weeks = updatedWeeks

                return updatedBlock
            } else {
                return block
            }
        })

        setForm({...form, blocks: updatedBlocks})
    }

    // addExercise
    const addExercise = (blockIndex, workoutIndex, activitiesIndex) => {
        let newExerciseList = []
        form.blocks[blockIndex].weeks[0].workouts[workoutIndex].activities[activitiesIndex].exercises.map((exercise) => {
            newExerciseList.push(exercise)
        })
        newExerciseList.push({name: 'New Exercise', reps: 0, sets: 0, intensity: 0.00, units: '', rest: 0})

        const updatedActivity = { ...form.blocks[blockIndex].weeks[0].workouts[workoutIndex].activities[activitiesIndex],
                                        ['exercises']: newExerciseList}

        const updatedActivities = form.blocks[blockIndex].weeks[0].workouts[workoutIndex].activities.map((activity, i) => {
            if (i == activitiesIndex) {
                return updatedActivity
            } else {
                return activity
            }
        })

        const updatedWorkout = { ...form.blocks[blockIndex].weeks[0].workouts[workoutIndex], 
                                ['activities']: updatedActivities}

        
        const updatedWorkouts = form.blocks[blockIndex].weeks[0].workouts.map((workout, i) => {
            if (i == workoutIndex) {
                return updatedWorkout
            } else {
                return workout
            }
        })

        const updatedWeeks = form.blocks[blockIndex].weeks.map((week, i) => {
            if (i == 0) {
                let updatedWeek = week
                updatedWeek.workouts = updatedWorkouts

                return updatedWeek
            } else {
                return week
            }
        })

        const updatedBlocks = form.blocks.map((block, i) => {
            if (i == blockIndex) {
                let updatedBlock = block
                updatedBlock.weeks = updatedWeeks

                return updatedBlock
            } else {
                return block
            }
        })

        setForm({...form, blocks: updatedBlocks})
    }
    
    return { 
        form, 
        handleChange, 
        handleChangeWorkout,
        handleChangeActivity,
        handleChangeExercise,
        createTrainingCycles, 
        addActivity,
        addExercise
    }
}

export default useForm