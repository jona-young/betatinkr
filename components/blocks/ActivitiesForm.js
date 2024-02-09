import React from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ExerciseTextField from './inputs/ExerciseTextField'

const ActivitiesForm = ({activities, indices, handleAddAllExercise, handleChangeAllActivities, handleChangeAllExercises}) => {
    const handleChange = (planIndex, blockIndex, workoutIndex, activityIndex, exerciseIndex, name, value) => {
        handleChangeAllExercises(blockIndex, workoutIndex, activityIndex, exerciseIndex, name, value)
    }

    return (
        <>
            <View style={styles.fieldBox}>
                <Text style={styles.label}>
                    Section
                </Text>
                <TextInput
                    style={styles.textField}
                    value={activities.name}
                    onChangeText={(value) => { handleChangeAllActivities(indices.blockIndex, indices.workoutIndex, indices.activityIndex, value) }}
                    inputMode={'text'}
                    keyboardType={'default'} />
            </View>
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleAddAllExercise(indices.blockIndex, indices.workoutIndex, indices.activityIndex)}
                    key={indices.blockIndex + indices.workoutIndex + '-' + indices.activityIndex}
                >
                <Text style={styles.buttonText}>
                    Add Exercise
                </Text>
            </TouchableOpacity>
            { activities && activities.exercises && activities.exercises.map((exercise, idx) => {
                return (
                    <ExerciseTextField 
                        exercise={exercise} 
                        indices={Object.assign({}, indices, { exerciseIndex: idx })} 
                        handleChange={handleChange} />
                )
                })
            }
        </>
    )
}

const styles = StyleSheet.create({
    fieldBox: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 40,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 10,
    },
    label: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#575757"
    },
    textField: {
        fontFamily: 'Raleway-Regular',
        padding: 5
    },
    button: {
        color: 'white',
        borderRadius: 10,
        backgroundColor: 'lightblue',
        marginTop: 5,
        marginRight: 'auto',
        marginLeft: 80,
        width: '35%',
        marginBottom: 5,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 4,
        paddingRight: 4
    },
    buttonText: {
        fontFamily: 'Raleway-Regular',
        textAlign: 'center'
    },
    exerciseBox: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 80,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 10,
    }
})

export default ActivitiesForm;