import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import ListButton from '../blocks/inputs/ListButton';
import { useTrainingStore } from '../../datastore/useTrainingStore'

const TrainingWeek = ({ route, navigation }) => {
    const { indices } = route.params
    const trainingWeek = useTrainingStore((state) => state.trainingPlans)[indices.planIndex].blocks[indices.blockIndex].weeks[indices.weekIndex]

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.banner}>
                <Text style={styles.header}>
                    {trainingWeek.name}
                </Text>
            </View>           
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.itemBox}>
                {
                    trainingWeek.workouts.map((workout, idx) => {
                        return <ListButton 
                                navigation={navigation} 
                                route={'TrainingDay'} 
                                planInfo={{info: workout}}
                                idx={'WT'+ (idx + 1)}
                                _iconColor={'#fab758'}
                                supplementaryInfo={"Number of sections: " + workout.activities.length}
                                indices={Object.assign({}, indices, {workoutIndex: idx})} />
                    })
                }       
                </View>
            </ScrollView>
        </SafeAreaView>
    )  
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#fab758',
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
    }
  });

export default TrainingWeek;