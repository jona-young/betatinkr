import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import TrainingWeekItem from '../blocks/TrainingWeekItem';
import WorkoutButton from '../blocks/WorkoutButton';

const TrainingCycle = ({ route, navigation }) => {
    const { cycle, blockIndex, handleWeekChangeWorkouts, cycleStart, plan, handleChangeExercise } = route.params

    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.banner}>
                    <Text style={styles.header}>
                        {cycle.name}
                    </Text>
                </View>
                <View>
                    <Text>
                            a. Remember to add deload % reduction set (100%-0% reduction in volume)
                    </Text>
                    <WorkoutButton 
                            navigation={navigation}
                            route={'CycleWorkout-Form'} 
                            btnInfo={{name: 'Setup Workouts Across All Weeks', plan: plan, index: blockIndex}} 
                            bgColor={'#fab758'}
                            extraStyling={styles.extraBtnStyling} />
                    <View style={styles.itemBox}>
                    {
                        cycle.weeks.map((microcycle, idx) => {
                            return <TrainingWeekItem 
                                    navigation={navigation} 
                                    week={microcycle}
                                    blockIndex={blockIndex} 
                                    idx={idx} 
                                    handleWeekChangeWorkouts={handleWeekChangeWorkouts}
                                    cycleStart={cycleStart}
                                    indexes={{blockIndex: blockIndex, weekIndex: idx }}
                                    handleChangeExercise={handleChangeExercise} />
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