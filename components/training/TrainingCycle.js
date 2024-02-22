import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import TrainingWeekItem from '../blocks/TrainingWeekItem';
import WorkoutButton from '../blocks/inputs/WorkoutButton';
import { useTrainingStore } from '../../datastore/useTrainingStore'

const TrainingCycle = ({ route, navigation }) => {
    const { indices } = route.params
    const trainingCycle = useTrainingStore((state) => state.trainingPlans)[indices.planIndex].blocks[indices.blockIndex]

    return (
        <SafeAreaView style={{flex: 1}}>
                <View style={styles.banner}>
                    <Text style={styles.header}>
                        {trainingCycle.name}
                    </Text>
                </View>
                    <WorkoutButton 
                            navigation={navigation}
                            route={'CycleWorkout-Form'} 
                            btnInfo={{name: 'Setup Workouts Across All Weeks', indices: indices}} 
                            bgColor={'#fab758'}
                            extraStyling={styles.extraBtnStyling} />
                    <ScrollView
                    contentInsetAdjustmentBehavior="automatic">
                        <View style={styles.itemBox}>
                        {
                            trainingCycle.weeks.map((microcycle, idx) => {
                                return <TrainingWeekItem 
                                        navigation={navigation} 
                                        week={microcycle}
                                        cycleStart={trainingCycle.startDate}
                                        key={'TCI-' + indices.planIndex + indices.blockIndex + idx}
                                        indices={Object.assign({}, indices, {weekIndex: idx})} />
                            })
                        }                                                                                      
                        </View>
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
    itemBox: {
        display: 'flex',
        flexDirection: 'column'
    },
    boxItem: {
        paddingLeft: 10,
        fontSize: 12,
        fontWeight: '700',
        backgroundColor: 'black',
        color: 'white',
        marginBottom: 10,
        padding: 10
    },
    extraBtnStyling: {
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '70%',
        padding: 5,
    }
  });

export default TrainingCycle;