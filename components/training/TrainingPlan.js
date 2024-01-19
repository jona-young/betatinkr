import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import ListButton from '../blocks/ListButton';
import ProgressBar from '../blocks/ProgressBar';


const TrainingPlan = ({route, navigation}) => {
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
                <ProgressBar progPct={0.5} color={'#45c4a0'} unfillColor={'#e1f6f0'} />
                <View>

                    <View style={styles.itemBox}>
                        {
                            plan.blocks.map((mesocycle, idx) => {
                                return <ListButton 
                                        navigation={navigation} 
                                        route={'TrainingCycle'} 
                                        planInfo={mesocycle} 
                                        idx={'TC'+ (idx + 1)}
                                        _iconColor={'#45c4a0'}
                                        supplementaryInfo={plan.startDate} />
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
        backgroundColor: '#45c4a0',
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