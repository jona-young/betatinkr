import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import WorkoutForm from '../blocks/WorkoutForm'
import useForm from '../../datahooks/useForm'

// Represents one mesocycle where FormTrainingCycles is a parent list of all mesocycles for the macrocycle
const FormTrainingCycle = ({ route, navigation}) => {
    // index refers to the mesocycle block within the training plan
    const { plan, index } = route.params
    const { form, handleChangeWorkout, handleChangeActivity, handleChangeExercise, addActivity, addExercise } = useForm(plan)

    // This will allow you to set the workout for all of the weeks in this mesocycle...
    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.workout}>
                    { form["blocks"][index].weeks[0].workouts.map((workout, workoutIdx) => {
                            return <WorkoutForm 
                                        workout={workout} 
                                        blockIndex={index} 
                                        workoutIndex={workoutIdx} 
                                        addActivity={addActivity}
                                        handleChangeWorkout={handleChangeWorkout}
                                        addExercise={addExercise}
                                        handleChangeActivity={handleChangeActivity}
                                        handleChangeExercise={handleChangeExercise} />
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    workout: {
        backgroundColor: 'lightgray',
    },
})

export default FormTrainingCycle;