import React, { useContext } from 'react';
import { useHeaderHeight } from '@react-navigation/elements'
import { SafeAreaView, ScrollView, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import WorkoutForm from '../blocks/WorkoutForm'
import useSetTrainingBlock from '../../datahooks/useSetTrainingBlock'
import SubmitButton from '../blocks/inputs/SubmitButton';
import { getPlanCopy } from '../../datastore/useTrainingStore'
import { AxiosContext } from '../../datastore/AxiosContext'


// Represents one mesocycle where FormTrainingCycles is a parent list of all mesocycles for the macrocycle
const FormCycleWorkouts = ({ route, navigation}) => {
    // index refers to the mesocycle block within the training plan
    const { indices } = route.params
    const height = useHeaderHeight()
    const trainingPlanCopy = getPlanCopy(indices)
    const axiosContext = useContext(AxiosContext)

    const { form, handleChangeWorkoutField, handleAddAllActivity, handleRemoveAllActivity, handleAddAllExercise, handleRemoveAllExercise, handleChangeAllActivities, handleChangeAllExercises } = useSetTrainingBlock(trainingPlanCopy)
    
    // This will allow you to set the workout for all of the weeks in this mesocycle...
    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                keyboardVerticalOffset={height + 25}
                behavior="padding"
                enabled>
                <ScrollView
                contentInsetAdjustmentBehavior="automatic">
                    <View style={styles.workout}>
                        <SubmitButton 
                                bgColor={'#fab758'}
                                submitFunc={() => axiosContext.putTrainingPlan(form, navigation, 'TrainingPlans')} />
                        { form.blocks[indices.blockIndex].weeks[0].workouts.map((workout, idx) => {
                                return <WorkoutForm 
                                            key={workout.name + ' - ' + idx}
                                            workout={workout} 
                                            indices={Object.assign({}, indices, {workoutIndex: idx})}
                                            handleChangeWorkoutField={handleChangeWorkoutField}
                                            handleChangeAllActivities={handleChangeAllActivities}
                                            handleChangeAllExercises={handleChangeAllExercises}
                                            handleAddAllActivity={handleAddAllActivity}
                                            handleRemoveAllActivity={handleRemoveAllActivity}
                                            handleAddAllExercise={handleAddAllExercise}
                                            handleRemoveAllExercise={handleRemoveAllExercise} />
                            })
                        }
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    workout: {
    },
})

export default FormCycleWorkouts;