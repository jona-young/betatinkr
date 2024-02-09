import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import WorkoutField from './inputs/WorkoutField';
import ActivitiesForm from './ActivitiesForm'
import { boxShadowStyle } from '../helpers/boxShadowStyle';


const WorkoutForm = ({workout, indices, handleChangeWorkoutField, handleAddAllActivity, handleAddAllExercise, handleChangeAllActivities, handleChangeAllExercises}) => {
    const boxShadow = boxShadowStyle(-2, 2, '#000000', 0.2, 3, 4)

        return (
            <View style={Object.assign({}, styles.workoutBox, boxShadow)}>
                <WorkoutField 
                    label={'Workout ' + (indices.workoutIndex + 1)} 
                    formValue={workout.name} 
                    indices={indices}
                    handleChangeWorkoutField={handleChangeWorkoutField}
                    inputMode={'text'}
                    keyboardType={'default'} />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleAddAllActivity(indices.blockIndex, indices.workoutIndex)}
                    key={indices.blockIndex + indices.workoutIndex + '-' + workout.name}
                >
                    <Text style={styles.buttonText}>
                        Add Section
                    </Text>
                </TouchableOpacity>
                { Object.entries(workout.activities).map(([key, value], idx) => {
                        return <ActivitiesForm 
                                    activities={value} 
                                    indices={Object.assign({}, indices, { activityIndex: idx})}
                                    handleAddAllExercise={handleAddAllExercise}
                                    handleChangeAllActivities={handleChangeAllActivities}
                                    handleChangeAllExercises={handleChangeAllExercises} />
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