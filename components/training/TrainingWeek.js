import React from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import ListButton from '../blocks/ListButton';
import ProgressBar from '../blocks/ProgressBar';

const TrainingWeek = ({ route, navigation }) => {
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
                <ProgressBar progPct={1} color={'#fab758'} unfillColor={'#fef3e4'} />
                <View>
                    <View style={styles.itemBox}>
                    {
                        plan.workouts.map((workout, idx) => {
                            return <ListButton 
                                    navigation={navigation} 
                                    route={'TrainingDay'} 
                                    planInfo={workout} 
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