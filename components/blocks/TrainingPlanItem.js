import { useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { boxShadowStyle } from '../helpers/boxShadowStyle';
import ModalChangePlan from './modals/ModalChangePlan'

const TrainingPlanItem = ({navigation, plan, supplementaryInfo, iconText, indices, setScreenRefresh}) => {
    const [ modalVis, setModalVis ] = useState(false)
    const boxShadow = boxShadowStyle(-2, 2, '#000000', 0.2, 3, 4)

    return (
        <View style={styles.itemBox}>
            <TouchableOpacity
                style={Object.assign({}, styles.boxFrame, boxShadow)}
                onPress={() => navigation.navigate("TrainingPlan", { indices: indices})}
            >
                <View style={styles.iconCircle}>
                    <Text style={styles.iconText}>
                        {/* icon training plan */}
                        {iconText}
                    </Text>
                </View>
                <View style={styles.textFrame}>
                    <Text style={styles.headerName} numberOfLines={1}>
                        {/* training plan name */}
                        {plan.name}
                    </Text>
                    <View style={styles.headerSub}>
                        <Text style={styles.subText}>
                            {/* training plan dates or location */}
                            {supplementaryInfo}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.weekBanner}
                onPress={() => setModalVis(!modalVis)}
                key={'wkChange-'+indices.blockIndex}>
                <Text style={styles.weekText}>Options</Text>
            </TouchableOpacity>
            <ModalChangePlan 
                navigation={navigation}
                modalVisible={modalVis} 
                setModalVisible={setModalVis}
                id={plan.id}
                setScreenRefresh={setScreenRefresh} />
        </View>
        
    )
}

const styles = StyleSheet.create({
    itemBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    boxFrame: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left',
        paddingLeft: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        width: '75%'
    },
    textFrame: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        width: '75%'
    },
    headerName: {
        fontFamily: "Raleway-Bold",
        fontSize: 16,
        color: "#000000",
        textAlign: 'left'
    },
    headerSub: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e9fa',
        marginTop: 10,
        marginRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5
    },
    iconCircle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginRight: 5,
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: '#3f78e0',
        paddingTop: 5,
        paddingBottom: 5,
    },
    subText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: '#3f78e0'
    },
    iconText: {
        fontFamily: 'Raleway-Bold',
        color: '#ffffff'
    },  
    weekBanner: {
        marginTop: 5,
        marginBottom: 5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#3f78e0',
        width: '17%',
        display: 'flex',
        justifyContent: 'center'
    },
    weekText: {
        fontFamily: 'Raleway-ExtraBold',
        fontSize: 14,
        textAlign: 'center',
        color: 'white'
    }
  });


export default TrainingPlanItem;