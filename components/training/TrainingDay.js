import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import TrainingSection from '../blocks/TrainingSection';
import ProgressBar from '../blocks/ProgressBar';

const TrainingDay = ({ route, navigation }) => {
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
                <ProgressBar progPct={0.46} color={'#3f78e0'} unfillColor={'#e0e9fa'} />
                <View>
                    <View style={styles.itemBox}>
                    {
                        plan.activities.map((section, idx) => {
                            return <TrainingSection section={section} idx={idx} />
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