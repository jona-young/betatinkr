import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import ListButton from '../blocks/ListButton';

const TrainingWeek = ({ route, navigation }) => {
    const { week, indexes, handleChangeExercise } = route.params

    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.banner}>
                    <Text style={styles.header}>
                        {week.name}
                    </Text>
                </View>
                <Text>
                    1. A button to create a workout that sets up for all weeks...otherwise users can edit individual workouts on their respective pages
                </Text>             
                <View>
                    <View style={styles.itemBox}>
                    {
                        week.workouts.map((workout, idx) => {
                            return <ListButton 
                                    navigation={navigation} 
                                    route={'TrainingDay'} 
                                    planInfo={{info: workout, indexes: Object.assign({}, indexes, {workoutIndex: idx}), handleChangeExercise: handleChangeExercise}} 
                                    idx={'WT'+ (idx + 1)}
                                    _iconColor={'#fab758'}
                                    supplementaryInfo={"Number of sections: " + workout.activities.length} />
                        })
                    }       
                    </View>
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