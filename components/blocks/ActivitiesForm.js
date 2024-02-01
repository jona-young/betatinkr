import React from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ExerciseTextField from '../blocks/ExerciseTextField'

const ActivitiesForm = ({activities, blockIndex, workoutIndex, activitiesIndex, addExercise, handleChangeActivity, handleChangeExercise}) => {
    return (
        <>
            <View style={styles.fieldBox}>
                <Text style={styles.label}>
                    Section
                </Text>
                <TextInput
                    style={styles.textField}
                    value={activities.name}
                    onChangeText={(value) => { handleChangeActivity(blockIndex, value, workoutIndex, activitiesIndex) }}
                    inputMode={'text'}
                    keyboardType={'default'} />
            </View>
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => addExercise(blockIndex, workoutIndex, activitiesIndex)}
                    key={blockIndex + workoutIndex + '-' + activitiesIndex}
                >
                <Text style={styles.buttonText}>
                    Add Exercise
                </Text>
            </TouchableOpacity>
            { activities && activities.exercises && activities.exercises.map((exercise, i) => {
                return (
                    <ExerciseTextField 
                        exercise={exercise} 
                        blockIndex={blockIndex} 
                        workoutIndex={workoutIndex}
                        activitiesIndex={activitiesIndex}
                        exerciseIndex={i}
                        handleChangeExercise={handleChangeExercise} />
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