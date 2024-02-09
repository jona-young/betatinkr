// import React from 'react'
import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import ListButton from '../blocks/inputs/ListButton';
import ButtonItem from '../blocks/inputs/ButtonItem'
import { getTrainingPlans } from '../../datahooks/useTrainingPlans';
import { boxShadowStyle } from '../helpers/boxShadowStyle';
import { useTrainingStore } from '../../datastore/useTrainingStore'

const TrainingPlans = ({navigation}) => {
    const boxShadow = boxShadowStyle(-2, 2, '#000000', 0.2, 3, 4)
    const trainings = useTrainingStore((state) => state.trainingPlans)
    const updateTrainingState = useTrainingStore((state) => state.updateTrainingPlans)
    
    useFocusEffect(useCallback(() => {
        let isActive = true;

        const getTrainings = async () => {
            return await getTrainingPlans(updateTrainingState)
        }

        getTrainings()

        return () => {
            isActive = false;
        }
    },[]))

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.banner}>
                <Text style={styles.header}>
                    Your Training Plans
                </Text>
                <ButtonItem 
                    navigation={navigation}
                    route={'TrainingPlan-Form'} 
                    btnInfo={{name: 'Add Plan'}} 
                    bgColor={'#fab758'}
                    extraStyling={styles.extraBtnStyling} />
            </View>
            <View style={Object.assign({}, styles.bannerSub, boxShadow)}>
                <View style={styles.bannerInfoBox}>
                    <Text style={styles.bannerStats}>
                        174hrs
                    </Text>
                    <Text style={styles.bannerText}>
                        Total Training
                    </Text>
                </View>
                <View style={styles.bannerInfoBox}>
                    <Text style={styles.bannerStats}>
                        6429lbs
                    </Text>
                    <Text style={styles.bannerText}>
                        Volume per Session
                    </Text>
                </View>
                <View style={styles.bannerInfoBox}>
                    <Text style={styles.bannerStats}>
                        22%
                    </Text>
                    <Text style={styles.bannerText}>
                        Macrocycle Completion
                    </Text>
                </View>
            </View>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.itemBox}>
                    {
                        trainings.map((plan, idx) => {
                            return <ListButton 
                                    navigation={navigation} 
                                    route={'TrainingPlan'} 
                                    planInfo={{info: plan}} 
                                    idx={'TP'+ (idx + 1)}
                                    _iconColor={'#3f78e0'}
                                    supplementaryInfo={plan.startDate + " - " + plan.endDate}
                                    indices={{planIndex: idx}} />
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
        display: 'flex',
        flexDirection: 'row'
    },
    header: {
        fontFamily: 'Raleway-Bold',
        color: 'white',
        fontSize: 24,
        paddingLeft: 10,
    },
    bannerSub: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#e0e9fa',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        height: 125
    },
    bannerInfoBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%'
    },
    bannerStats: {
        fontFamily: 'Raleway-ExtraBold',
        fontSize: 24,
        color: '#3f78e0'
    },
    bannerText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
        color: '#3f78e0',
        textAlign: 'center',
        paddingTop: 5
    },
    itemBox: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10
    },
    imgBanner: {
        marginTop: 10,
        height: 300,
        width: 400
    },
    extraBtnStyling: {
        marginRight: 10,
        marginLeft: 'auto',
        width: '25%',
        padding: 5,
    }
  })

export default TrainingPlans;