import React, { useContext, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from 'react-native';
import { useTrainingStore, addActivity } from '../../datastore/useTrainingStore'
import { AxiosContext } from '../../datastore/AxiosContext'
import TrainingSections from './TrainingSections';
import ModalCopyWorkout from '../blocks/modals/ModalCopyWorkout';
import ModalLoadNewSection from '../blocks/modals/ModalLoadNewSection';


const TrainingDay = ({ navigation, route }) => {
    const { indices } = route.params
    const [ modalCopyWorkout, setModalCopyWorkout ] = useState(false)
    const [ modalLoadSection, setModalLoadSection ] = useState(false)
    const trainingBlock = useTrainingStore((state) => state.trainingPlans)[indices.planIndex].blocks[indices.blockIndex]
    const trainingDay = trainingBlock.weeks[indices.weekIndex].workouts[indices.workoutIndex]

    const axiosContext = useContext(AxiosContext)

    return (
        <SafeAreaView style={{flex: 1}}>
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
                
                <ModalLoadNewSection 
                indices={indices}
                modalVisible={modalLoadSection} 
                setModalVisible={setModalLoadSection}
                navigation={navigation} />
            </ScrollView>
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
    addText: {
        fontFamily: 'Raleway-ExtraBold',
        fontSize: 12,
        color: 'white',
    },
  });

export default TrainingDay;