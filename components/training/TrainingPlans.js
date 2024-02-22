import React, { useState, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from 'react-native';
import TrainingPlanItem from '../blocks/TrainingPlanItem'
import ButtonItem from '../blocks/inputs/ButtonItem'
import { boxShadowStyle } from '../helpers/boxShadowStyle';
import { useTrainingStore } from '../../datastore/useTrainingStore'
import { AuthContext } from '../../datastore/AuthContext'
import { AxiosContext } from '../../datastore/AxiosContext'

const TrainingPlans = ({navigation}) => {
    const [screenActive, setScreenActive ] = useState(true)
    const boxShadow = boxShadowStyle(-2, 2, '#000000', 0.2, 3, 4)
    const trainingPlans = useTrainingStore((state) => state.trainingPlans)

    const updateTrainingState = useTrainingStore((state) => state.updateTrainingPlans)
    const authContext = useContext(AuthContext)
    const axiosContext = useContext(AxiosContext)

    useFocusEffect(useCallback(() => {        
        const getTrainingPlanData = () => {
            axiosContext.getUserTrainingPlans(updateTrainingState)
        }

        getTrainingPlanData()

        return () => {
            setScreenActive(false)
        }
    },[screenActive]))

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.banner}>
                <Text style={styles.header}>
                    Your Training Plans
                </Text>
            </View>
            <View style={Object.assign({}, styles.bannerSub, boxShadow)}>
                <ButtonItem 
                    navigation={navigation}
                    route={'TrainingPlan-Form'} 
                    btnInfo={{name: 'Add Plan'}} 
                    bgColor={'#fab758'}
                    extraStyling={styles.extraBtnStyling} />

                <TouchableOpacity
                    style={styles.btnStyling}
                    onPress={() => authContext.logout()} >
                    <Text style={styles.RalewayBold}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.itemBox}>
                    {
                        trainingPlans.map((plan, idx) => {
                            return <TrainingPlanItem
                                    navigation={navigation} 
                                    route={'TrainingPlan'} 
                                    plan={plan} 
                                    iconText={'TP'+ (idx + 1)}
                                    key={'TP'+ (idx + 1)}
                                    _iconColor={'#3f78e0'}
                                    supplementaryInfo={plan.startDate + " - " + plan.endDate}
                                    indices={{planIndex: idx}}
                                    setScreenRefresh={setScreenActive} />                            
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
        paddingBottom: 10,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
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
        height: 28,
        marginTop: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        color: 'white',
        borderRadius: 10,
    },
    btnStyling: {
        height: 28,
        marginTop: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,        
        color: 'white',
        borderRadius: 10,
        backgroundColor: '#de2a1d'
    },
    RalewayBold: {
        fontFamily: "Raleway-Bold",
        fontSize: 14,
        color: "#FFFFFF",
        textAlign: 'center'
    }
  })

export default TrainingPlans;