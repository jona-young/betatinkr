import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from 'react-native';
import TrainingSection from '../training/TrainingSection'
import { useTrainingStore, addExercise } from '../../datastore/useTrainingStore'
import ModalChangeSection from '../blocks/modals/ModalChangeSection'


const TrainingSections = ({indices, navigation}) => {
    const [ modalVis, setModalVis ] = useState(false)
    const section = useTrainingStore((state) => state.trainingPlans)[indices.planIndex].blocks[indices.blockIndex].weeks[indices.weekIndex].workouts[indices.workoutIndex].activities[indices.activityIndex]
    
    return (
        <View style={styles.sectionBox}>
            <TouchableOpacity 
            onPress={() => setModalVis(!modalVis)}
            key={indices.activityIndex + '-' + section.name} >
                <View style={styles.sectionBanner}>
                    <Text style={styles.header}>
                        {section.name}
                    </Text>
                    <View style={styles.editHeading}>
                        <Text style={styles.editText}>Click heading to edit...</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.sectionContent}>
                <View style={styles.itemBox}>
                    <Text style={Object.assign({}, styles.exerciseItem, styles.exerciseHeading)} numberOfLines={1}>
                        Name
                    </Text> 
                    <Text style={Object.assign({}, styles.boxItem, styles.boxHeading)}>
                        Sets
                    </Text> 
                    <Text style={Object.assign({}, styles.boxItem, styles.boxHeading)}>
                        Reps
                    </Text> 
                    <Text style={Object.assign({}, styles.unitsItem, styles.unitsHeading)}>
                        Intensity
                    </Text> 
                    <Text style={Object.assign({}, styles.unitsItem, styles.unitsHeading)}>
                        Rest
                    </Text>
                </View>
                {
                    section.exercises.map((exercise, idx) => {
                        return (
                            <TrainingSection
                                exercise={exercise}
                                indices={Object.assign({}, indices, { exerciseIndex: idx })}
                                navigation={navigation} />
                        )
                    })
                }
            </View>
            <TouchableOpacity
                style={styles.extraBtnStyling}
                onPress={() => addExercise(indices.planIndex, indices.blockIndex, indices.weekIndex, indices.weekIndex, indices.workoutIndex, indices.activityIndex, navigation)} >
                <Text style={styles.addText}>
                    Add new exercise...
                </Text>
            </TouchableOpacity>
            <ModalChangeSection 
            activityName={section.name}
            indices={indices}
            modalVisible={modalVis} 
            setModalVisible={setModalVis}
            navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    sectionBox: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    sectionBanner: {
        backgroundColor: '#3f78e0',
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
    addText: {
        fontFamily: 'Raleway-ExtraBold',
        fontSize: 12,
        color: 'white',
    },
    extraBtnStyling: {
        width: '35%',
        padding: 10,
        backgroundColor: '#3f78e0',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },    
    btnStyling: {
        width: '30%',
        marginRight: 10,
        padding: 5,
        backgroundColor: "#de2a1d",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    addText: {
        fontFamily: 'Raleway-ExtraBold',
        fontSize: 12,
        color: 'white',
        textAlign: 'center'
    },
    itemBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    exerciseItem: {
        fontSize: 12,
        color: '#3f78e0',
        width: '40%',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,

    },
    exerciseName: {
        fontFamily: 'Raleway-Medium',
    },
    exerciseHeading: {
        fontFamily: 'Raleway-ExtraBold',
    },
    boxItem: {
        fontSize: 12,
        color: '#3f78e0',
        width: '10%',
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    boxHeading: {
        fontFamily: 'Raleway-ExtraBold',
    },
    boxText: {
        fontFamily: 'Raleway-Medium',
    },
    unitsItem: {
        fontSize: 12,
        color: '#3f78e0',
        paddingTop: 5,
        paddingBottom: 5,
        width: '20%',
        textAlign: 'center',
    },
    unitsHeading: {
        fontFamily: 'Raleway-ExtraBold',
    },
    unitsText: {
        fontFamily: 'Raleway-Medium',
    },
  });

export default TrainingSections