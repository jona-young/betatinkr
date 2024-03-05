import React from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ExerciseTemplateTextField from './inputs/ExerciseTemplateTextField'

const ActivityTemplateForm = ({activities, lastActivity, indices, handleChangeActivityName, handleChangeExercise, addActivity, removeActivity, addExercise, removeExercise}) => {
    return (
        <>
            <View style={styles.lineBox}>
                { lastActivity ?
                    <TouchableOpacity
                    style={Object.assign({}, styles.button, {marginLeft: 20})}
                    onPress={() => addActivity()}
                    >
                        <Text style={styles.buttonText}>
                            +
                        </Text>
                    </TouchableOpacity>
                    :
                    <View style={{marginLeft: 50}}></View>
                }
                <TouchableOpacity
                    style={Object.assign({}, styles.button, {marginLeft: 20})}
                    onPress={() => removeActivity(indices.activityIndex)}
                >
                    <Text style={styles.buttonText}>
                        -
                    </Text>
                </TouchableOpacity>
                <View style={styles.fieldBox}>
                    <Text style={styles.label}>
                        Section
                    </Text>
                    <TextInput
                        style={styles.textField}
                        value={activities.name}
                        onChangeText={(value) => { handleChangeActivityName(indices.activityIndex, value) }}
                        inputMode={'text'}
                        keyboardType={'default'} />
                </View>
            </View>
            { activities && activities.exercises && activities.exercises.map((exercise, idx) => {
                return (
                    <ExerciseTemplateTextField 
                        key={'EXTT-' + indices.activityIndex + idx}
                        exercise={exercise} 
                        lastExercise={idx == activities.exercises.length - 1 ? true : false}
                        indices={Object.assign({}, indices, { exerciseIndex: idx })} 
                        handleChangeExercise={handleChangeExercise}
                        addExercise={addExercise}
                        removeExercise={removeExercise} />
                )
                })
            }
        </>
    )
}

const styles = StyleSheet.create({
    lineBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'teal',
        paddingTop: 10,
        paddingBottom: 10
    },
    fieldBox: {
        backgroundColor: 'white',
        marginRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 10,
        width: '60%'
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
        marginBottom: 5,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10
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

export default ActivityTemplateForm;