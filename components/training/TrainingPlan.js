import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
  } from 'react-native';
import TrainingCycleItem from '../blocks/TrainingCycleItem';
import { useTrainingStore } from '../../datastore/useTrainingStore'


//BRING OVER THE INDEX OF THE PLAN
const TrainingPlan = ({route, navigation}) => {
    const { indices } = route.params

    const trainingPlan = useTrainingStore((state) => state.trainingPlans)[indices.planIndex]


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.banner}>
                <Text style={styles.header}>
                    {trainingPlan.name}
                </Text>
            </View>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                    <View>
                    {
                        trainingPlan.blocks.map((cycle, idx) => {
                            return <TrainingCycleItem 
                                        navigation={navigation} 
                                        cycle={cycle} 
                                        indices={Object.assign({}, indices, {blockIndex: idx})} />
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
  });

export default TrainingPlan;