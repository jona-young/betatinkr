import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import WorkoutForm from '../blocks/WorkoutForm'
import useForm from '../../datahooks/useForm'
import SubmitButton from '../blocks/SubmitButton';
import { putTrainingPlan } from '../../datahooks/useTrainingPlans'


// Represents one mesocycle where FormTrainingCycles is a parent list of all mesocycles for the macrocycle
const FormCycleWorkouts = ({ route, navigation}) => {
    // index refers to the mesocycle block within the training plan
    const { plan, index } = route.params
    const { form, handleChangeWorkout, handleChangeAllActivities, handleChangeAllExercises, handleAddAllActivity, handleAddAllExercise } = useForm(plan)

    // This will allow you to set the workout for all of the weeks in this mesocycle...
    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.workout}>
                    <SubmitButton 
                            bgColor={'#fab758'}
                            submitFunc={() => putTrainingPlan(form, navigation, 'TrainingPlans')} />
                    { form["blocks"][index].weeks[0].workouts.map((workout, workoutIdx) => {
                            return <WorkoutForm 
                                        workout={workout} 
                                        blockIndex={index} 
                                        workoutIndex={workoutIdx} 
                                        addActivity={handleAddAllActivity}
                                        handleChangeWorkout={handleChangeWorkout}
                                        addExercise={handleAddAllExercise}
                                        handleChangeActivity={handleChangeAllActivities}
                                        handleChangeExercise={handleChangeAllExercises} />
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    workout: {
    },
})

export default FormCycleWorkouts;