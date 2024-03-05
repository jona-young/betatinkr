import React, { useState, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import ActivityTemplateItem from '../blocks/ActivityTemplateItem'
import ButtonItem from '../blocks/inputs/ButtonItem'
import { boxShadowStyle } from '../helpers/boxShadowStyle';
import { useActivityTemplateStore } from '../../datastore/useActivityTemplateStore'
import { AxiosContext } from '../../datastore/AxiosContext'

const ActivityTemplates = ({navigation}) => {
    const [screenActive, setScreenActive ] = useState(true)
    const boxShadow = boxShadowStyle(-2, 2, '#000000', 0.2, 3, 4)
    const activityTemplates = useActivityTemplateStore((state) => state.activityTemplates)

    const updateTemplatesState = useActivityTemplateStore((state) => state.updateActivityTemplates)
    const axiosContext = useContext(AxiosContext)

    useFocusEffect(useCallback(() => {        
        const getActivityTemplatesData = () => {
            axiosContext.getActivityTemplates(updateTemplatesState)
        }

        getActivityTemplatesData()

        return () => {
            setScreenActive(false)
        }
    },[screenActive]))

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.banner}>
                <Text style={styles.header}>
                    Your Activity Templates
                </Text>
            </View>
            <View style={Object.assign({}, styles.bannerSub, boxShadow)}>
                <ButtonItem 
                    navigation={navigation}
                    route={'ActivityTemplate-Form'} 
                    btnInfo={{name: 'Add Section Template'}} 
                    bgColor={'#fab758'}
                    extraStyling={styles.extraBtnStyling} />
            </View>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.itemBox}>
                    {
                        activityTemplates.map((template, idx) => {
                            return <ActivityTemplateItem
                                    navigation={navigation} 
                                    template={template} 
                                    iconText={'AT'+ (idx + 1)}
                                    key={'AT'+ (idx + 1)}
                                    indices={{activityIndex: idx}}
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

export default ActivityTemplates;