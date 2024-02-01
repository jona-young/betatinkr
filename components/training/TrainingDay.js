import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import TrainingSection from './TrainingSections';

const TrainingDay = ({ route, navigation }) => {
    const { plan } = route.params
    
    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.banner}>
                    <Text style={styles.header}>
                        {plan.info.name}
                    </Text>
                </View>
                <Text>
                    1. A button to add/remove sections
                </Text> 
                <Text>
                    2. A button to add/remove exercises and their respective reps, sets, units, intensity, rest
                </Text>    
                <View>
                    <View style={styles.itemBox}>
                    {
                        plan.info.activities.map((section, idx) => {
                            return <TrainingSection section={section} 
                                                    idx={idx} 
                                                    indexes={Object.assign({}, plan.indexes, {activityIndex: idx})} 
                                                    handleChangeExercise={plan.handleChangeExercise} />
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
    }
  });

export default TrainingDay;