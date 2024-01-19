import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import WorkoutField from './WorkoutField';
import ActivitiesForm from './ActivitiesForm'

const WorkoutForm = ({workout, blockIndex, workoutIndex, addActivity, handleChangeWorkout, addExercise, handleChangeActivity, handleChangeExercise}) => {
        return (
            <>
                <WorkoutField 
                    label={'Name'} 
                    formValue={workout.name} 
                    handleChange={handleChangeWorkout} 
                    index={blockIndex} 
                    workoutIdx={workoutIndex}
                    inputMode={'text'}
                    keyboardType={'default'} />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => addActivity(blockIndex, workoutIndex)}
                    key={blockIndex + workoutIndex + '-' + workout.name}
                >
                    <Text style={styles.buttonText}>
                        Add Section
                    </Text>
                </TouchableOpacity>
                { Object.entries(workout.activities).map(([key, value], index) => {
                        return <ActivitiesForm 
                                    activities={value} 
                                    blockIndex={blockIndex} 
                                    workoutIndex={workoutIndex} 
                                    activitiesIndex={index}
                                    addExercise={addExercise}
                                    handleChangeActivity={handleChangeActivity}
                                    handleChangeExercise={handleChangeExercise} />
                    })
                }
            </>
        )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#575757"
    },
    button: {
        color: 'white',
        borderRadius: 10,
        backgroundColor: 'orange',
        marginTop: 5,
        marginRight: 'auto',
        marginLeft: 40,
        width: '26%',
        marginBottom: 5,
        padding: 10
    },
    buttonText: {
        fontFamily: 'Raleway-Regular',
        textAlign: 'center'
    },
})

export default WorkoutForm