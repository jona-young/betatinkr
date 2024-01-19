import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import ListButton from '../blocks/ListButton';
import ProgressBar from '../blocks/ProgressBar'

const TrainingCycle = ({ route, navigation }) => {
    const { plan } = route.params

    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.banner}>
                    <Text style={styles.header}>
                        {plan.name}
                    </Text>
                </View>
                <ProgressBar progPct={0.66} color={'#d16b86'} unfillColor={'#f8e7ec'} />
                <View>
                    <View style={styles.itemBox}>
                    {
                        plan.weeks.map((microcycle, idx) => {
                            return <ListButton 
                                    navigation={navigation} 
                                    route={'TrainingWeek'} 
                                    planInfo={microcycle} 
                                    idx={'TW'+ (idx + 1)}
                                    _iconColor={'#d16b86'}
                                    supplementaryInfo={"Number of workouts: " + microcycle.workouts.length} />
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
        backgroundColor: '#d16b86',
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

export default TrainingCycle;