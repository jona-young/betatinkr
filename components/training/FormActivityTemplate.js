import React, { useState, useContext } from 'react';
import { useHeaderHeight } from '@react-navigation/elements'
import { SafeAreaView, ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, TextInput } from 'react-native';
import useSetActivityTemplate from '../../datahooks/useSetActivityTemplate'
import SubmitButton from '../blocks/inputs/SubmitButton';
import { AxiosContext } from '../../datastore/AxiosContext'
import ExerciseTemplateTextField from '../blocks/inputs/ExerciseTemplateTextField'



// Represents one mesocycle where FormTrainingCycles is a parent list of all mesocycles for the macrocycle
const FormActivityTemplate = ({ route, navigation}) => {
    // index refers to the mesocycle block within the training plan
    /* 
        const { editForm, formData } = route.params

        pass through route params if useSetActivityTemplate should pass editable template data 
    */
   
    const height = useHeaderHeight()
    const axiosContext = useContext(AxiosContext)
    const [ errors, setErrors] = useState({})

    const { form, handleChangeActivityName, handleChangeExercise, addActivity, removeActivity, addExercise, removeExercise } = useSetActivityTemplate()
    
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
                                submitFunc={() => axiosContext.postActivityTemplate(form, navigation, 'TrainingPlans', setErrors)} />
                        { form.map((activity, idx) => {
                            return (
                                <>
                                    <View style={styles.lineBox}>
                                        { idx == form.length - 1 ?
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
                                            onPress={() => removeActivity(idx)}
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
                                                value={activity.name}
                                                onChangeText={(value) => { handleChangeActivityName(idx, value) }}
                                                inputMode={'text'}
                                                keyboardType={'default'} />
                                        </View>
                                    </View>
                                    { activity && activity.exercises && activity.exercises.map((exercise, i) => {
                                        return (
                                            <ExerciseTemplateTextField 
                                                key={'EXTT-' + idx + i}
                                                exercise={exercise} 
                                                lastExercise={i == activity.exercises.length - 1 ? true : false}
                                                indices={Object.assign({}, {activityIndex: idx}, { exerciseIndex: i })} 
                                                handleChangeExercise={handleChangeExercise}
                                                addExercise={addExercise}
                                                removeExercise={removeExercise} />
                                        )
                                        })
                                    }
                                </>
                            )
                        })}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    workout: {
    },
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

export default FormActivityTemplate;