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

const TrainingDay = ({ navigation, route }) => {
    const { indices } = route.params
    const [ modalVis, setModalVis ] = useState(false)
    const trainingDay = useTrainingStore((state) => state.trainingPlans)[indices.planIndex].blocks[indices.blockIndex].weeks[indices.weekIndex].workouts[indices.workoutIndex]
    const axiosContext = useContext(AxiosContext)

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.banner}>
                <Text style={styles.header}>
                    {trainingDay.name}
                </Text>
            </View> 
            <TouchableOpacity 
                style={styles.optionBox}
                onPress={() => setModalVis(!modalVis)}>
                <Text style={styles.optionText}>Copy</Text>
            </TouchableOpacity>
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
                <TouchableOpacity
                    style={styles.btnStyling}
                    onPress={() => addActivity(axiosContext, indices.planIndex, indices.blockIndex, indices.weekIndex, indices.weekIndex, indices.workoutIndex, navigation)} >
                        <Text style={styles.addText}>
                            Add new Section..
                        </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )  
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#3f78e0',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10
    },
    header: {
        fontFamily: 'Raleway-Bold',
        color: 'white',
        fontSize: 24,
        paddingLeft: 10,
    },
    optionBox: {
        marginTop: 5,
        marginBottom: 5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: '#3f78e0',
        width: '16%',
        marginLeft: 'auto'
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
    },
    itemBox: {
        display: 'flex',
        flexDirection: 'column'
    },
    btnStyling: {
        width: '33%',
        marginLeft: 10,
        padding: 10,
        backgroundColor: "#fab758",
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