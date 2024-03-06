import React, { useContext, useState } from 'react';
import {
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
  } from 'react-native';
import { useTrainingStore, addActivity, handleChangeWorkoutField } from '../../datastore/useTrainingStore'
import { AxiosContext } from '../../datastore/AxiosContext'
import TrainingSections from './TrainingSections';
import ModalCopyWorkout from '../blocks/modals/ModalCopyWorkout';
import ModalLoadNewSection from '../blocks/modals/ModalLoadNewSection';
import { useHeaderHeight } from '@react-navigation/elements'

const TrainingDay = ({ navigation, route }) => {
    const { indices } = route.params
    const height = useHeaderHeight()
    const [ modalCopyWorkout, setModalCopyWorkout ] = useState(false)
    const [ modalLoadSection, setModalLoadSection ] = useState(false)
    const trainingBlock = useTrainingStore((state) => state.trainingPlans)[indices.planIndex].blocks[indices.blockIndex]
    const trainingDay = trainingBlock.weeks[indices.weekIndex].workouts[indices.workoutIndex]

    const [ workoutNotes, setWorkoutNotes ] = useState(trainingDay.notes)
    const handleClearNotes = () => {
        handleChangeWorkoutField(axiosContext, indices.planIndex, indices.blockIndex, indices.workoutIndex, 'notes', "", navigation)
        setWorkoutNotes("")
    }

    const axiosContext = useContext(AxiosContext)
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={height + 25}
                behavior="position"
                enabled>
                <View style={styles.banner}>
                    <Text style={styles.header}>
                        {trainingDay.name}
                    </Text>
                </View> 
                { indices.weekIndex > 0 ?
                    <>
                        <TouchableOpacity 
                            style={styles.optionBox}
                            onPress={() => setModalCopyWorkout(!modalCopyWorkout)}>
                            <Text style={styles.optionText}>Copy Workout from past week</Text>
                        </TouchableOpacity>
                        <ModalCopyWorkout 
                        indices={indices}
                        modalVisible={modalCopyWorkout} 
                        setModalVisible={setModalCopyWorkout}
                        navigation={navigation}
                        deload={trainingBlock.deload}
                        lastWeekIndex={trainingBlock.weeks.length - 1} />
                    </>
                    :
                    <View style={styles.headerSpacer}>
                    </View>
                }
                <ScrollView
                contentInsetAdjustmentBehavior="automatic">
                    <View>
                        <View style={styles.itemBox}>
                        {
                            trainingDay.activities.map((section, idx) => {
                                return <TrainingSections 
                                            indices={Object.assign({}, indices, {activityIndex: idx })}
                                            key={'TS-' + indices.planIndex + indices.blockIndex + indices.weeksIndex + indices.workoutsIndex + idx}
                                            navigation={navigation} />
                            })
                        }                                                                                                                                                                             
                        </View>
                    </View>
                    <View style={styles.btnLayout}>
                        <TouchableOpacity
                            style={Object.assign({}, styles.btnStyling, {backgroundColor: "#fab758", marginLeft: 10})}
                            onPress={() => addActivity(axiosContext, indices.planIndex, indices.blockIndex, indices.weekIndex, indices.weekIndex, indices.workoutIndex, navigation, true, {})} >
                                <Text style={styles.addText}>
                                    Add new section..
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={Object.assign({}, styles.btnStyling, {backgroundColor: "#f54518"})}
                            onPress={() => setModalLoadSection(!modalLoadSection)}>
                            <Text style={styles.addText}>
                                    Load section... 
                                </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sectionBanner}>
                        <Text style={styles.header}>
                            Notes
                        </Text>
                    </View>
                    <View style={styles.sectionContent}>
                        <Text style={styles.label}>Type Here:</Text>
                        <TextInput
                            style={styles.textField}
                            value={workoutNotes}
                            onChangeText={(value) => { setWorkoutNotes(value)}}
                            multiline={true}
                            placeholder={"Place your reflections and thoughts about your workout here..."}
                            inputMode={'text'}
                            keyboardType={'default'} />
                    </View>
                    <View style={Object.assign({}, styles.btnLayout, { marginLeft: 10, marginRight: 10 })}>
                        <TouchableOpacity
                        style={Object.assign({}, styles.extraBtnStyling, { backgroundColor: "#fab758" })}
                        onPress={() => handleChangeWorkoutField(axiosContext, indices.planIndex, indices.blockIndex, indices.workoutIndex, 'notes', workoutNotes, navigation)} >
                            <Text style={styles.addText}>
                                Save Notes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={Object.assign({}, styles.extraBtnStyling, { backgroundColor: "#f54518" })}
                        onPress={() => handleClearNotes()} >
                            <Text style={styles.addText}>
                                Clear
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ModalLoadNewSection 
                    indices={indices}
                    modalVisible={modalLoadSection} 
                    setModalVisible={setModalLoadSection}
                    navigation={navigation} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )  
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#3f78e0',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        fontFamily: 'Raleway-Bold',
        color: 'white',
        fontSize: 24,
        paddingLeft: 10,
    },
    headerSpacer: {
        marginBottom: 10
    },
    optionBox: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#fab758',
        padding: 10,
        width: '65%'
    },
    weekNum: {
        fontFamily: 'Raleway-Bold',
        fontSize: 32,
        textAlign: 'center',
        paddingBottom: 3
    },
    optionText: {
        fontFamily: 'Raleway-Medium',
        fontSize: 14,
        textAlign: 'center',
        color: 'white',
    },
    itemBox: {
        display: 'flex',
        flexDirection: 'column'
    },
    btnLayout: {
        display: 'flex',
        flexDirection: 'row'
    },
    btnStyling: {
        width: '33%',
        marginBottom: 10,
        padding: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    extraBtnStyling: {
        width: '50%',
        padding: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    addText: {
        fontFamily: 'Raleway-ExtraBold',
        fontSize: 12,
        color: 'white',
    },
    sectionBanner: {
        backgroundColor: '#3f78e0',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionContent: {
        backgroundColor: '#e0e9fa',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 10
    },
    header: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 18,
        marginTop: 5,
        color: 'white',
    },
    editHeading: {
        marginRight: 10,
        padding: 5,
        backgroundColor: "#e0e9fa",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    editText: {
        fontSize: 12,
        color: '#3f78e0'
    },
    boxItem: {
        fontSize: 12,
        color: '#3f78e0',
        width: '10%',
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    fieldBox: {
        backgroundColor: '#e0e9fa',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 10,
        width: '100%'
    },
    label: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#575757"
    },
    textField: {
        fontFamily: 'Raleway-Regular',
        padding: 5,
        color: "#575757",
        height: 'auto'
    },
  });

export default TrainingDay;