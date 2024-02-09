import { useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { boxShadowStyle } from '../helpers/boxShadowStyle';
import { createDeloadInfo } from '../helpers/createDeloadInfo';
import { handleChangeDeload } from '../../datastore/useTrainingStore'
import ModalChangeWeek from './modals/ModalChangeWeek'

const TrainingCycleItem = ({navigation, cycle, indices}) => {
    const [ modalVis, setModalVis ] = useState(false)
    const boxShadow = boxShadowStyle(-2, 2, '#000000', 0.2, 3, 4)
    const deloadBox = createDeloadInfo(cycle.deload)
    
    return (
        <View style={styles.itemBox}>
            <TouchableOpacity
                style={Object.assign({}, styles.boxFrame, boxShadow)}
                onPress={() => navigation.navigate("TrainingCycle", { indices: indices})}
                key={indices.blockIndex + '-' + cycle.name}
            >
                <View style={styles.iconCircle}>
                    <Text style={styles.iconText}>
                        {/* icon training plan */}
                        {indices.blockIndex + 1}
                    </Text>
                </View>
                <View style={styles.textFrame}>
                    <View>
                        <Text style={styles.headerName}>
                            {/* training plan name */}
                            {cycle.name}
                        </Text>
                    </View>
                    <View style={styles.headerSub}>
                        <Text style={styles.subText}>
                            {/* training plan dates or location */}
                            {cycle.startDate + " - " + cycle.endDate}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.weekBanner}
                onPress={() => setModalVis(!modalVis)}
                key={'wkChange-'+indices.blockIndex}>
                <Text style={styles.weekNum}>{cycle.weeks.length}</Text>
                <Text style={styles.weekText}>Weeks</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.deloadBanner}
                onPress={() => handleChangeDeload(indices.planIndex, indices.blockIndex, navigation)}
                key={'deloadBtn-'+indices.blockIndex}>
                {deloadBox}
            </TouchableOpacity>
            <ModalChangeWeek 
                name={cycle.name} 
                value={cycle.weeks.length} 
                blockIndex={indices.blockIndex} 
                modalVisible={modalVis} 
                setModalVisible={setModalVis}
                planIndex={indices.planIndex}
                dataLabel={'Week'}
                navigation={navigation} />
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
        backgroundColor: '#3f78e0',
        width: '16%',
        marginLeft: 'auto'
    },
    weekNum: {
        fontFamily: 'Raleway-Bold',
        fontSize: 32,
        textAlign: 'center',
        paddingBottom: 3
    },
    weekText: {
        fontFamily: 'Raleway-Medium',
        fontSize: 14,
        textAlign: 'center',
    },
    weekNo: {
        fontFamily: 'Raleway-ExtraBold',
        fontSize: 28,
        textAlign: 'center',
        paddingBottom: 3,
        paddingTop: 5
    },
    deloadBanner: {
        backgroundColor: '#e0e9fa',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: '16%',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 10,
    }
  });


export default TrainingCycleItem;