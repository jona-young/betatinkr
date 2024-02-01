import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import WorkoutField from './WorkoutField';
import ActivitiesForm from './ActivitiesForm'
import { boxShadowStyle } from '../helpers/boxShadowStyle';

const WorkoutForm = ({workout, blockIndex, workoutIndex, addActivity, handleChangeWorkout, addExercise, handleChangeActivity, handleChangeExercise}) => {
    const boxShadow = boxShadowStyle(-2, 2, '#000000', 0.2, 3, 4)

        return (
            <View style={Object.assign({}, styles.workoutBox, boxShadow)}>
                <WorkoutField 
                    label={'Workout ' + (workoutIndex + 1)} 
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
            </View>
        )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#575757"
    },
    button: {
        borderRadius: 10,
        backgroundColor: '#fab758',
        marginTop: 5,
        marginRight: 'auto',
        marginLeft: 40,
        width: '30%',
        marginBottom: 5,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10
    },
    buttonText: {
        fontFamily: 'Raleway-Regular',
        textAlign: 'center',
        color: 'white',

    },
    workoutBox: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 25,
        backgroundColor: '#e0e9fa',
        borderRadius: 5,
    }
})

export default WorkoutForm