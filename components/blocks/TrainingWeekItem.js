import { useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { boxShadowStyle } from '../helpers/boxShadowStyle';
import useWeekDates from '../../datahooks/useWeekDates'
import ModalChangeWorkout from './modals/ModalChangeWorkout'

const TrainingWeekItem = ({navigation, week, cycleStart, indices}) => {
    const [ modalVis, setModalVis ] = useState(false)
    const boxShadow = boxShadowStyle(-2, 2, '#000000', 0.2, 3, 4)
    const weekDates = useWeekDates(cycleStart, indices.weekIndex)

    return (
        <View style={styles.itemBox} key={'TWI-' + indices.planIndex + indices.blockIndex + indices.weekIndex}>
            <TouchableOpacity
                style={Object.assign({}, styles.boxFrame, boxShadow)}
                onPress={() => navigation.navigate("TrainingWeek", { indices: indices})}
                key={indices.weekIndex + '-' + week.name}
            >
                <View style={styles.iconCircle}>
                    <Text style={styles.iconText}>
                        {/* icon training plan */}
                        {indices.weekIndex + 1}
                    </Text>
                </View>
                <View style={styles.textFrame}>
                    <View>
                        <Text style={styles.headerName}>
                            {/* training plan name */}
                            {week.name}
                        </Text>
                    </View>
                    <View style={styles.headerSub}>
                        <Text style={styles.subText}>
                            {/* training plan dates or location */}
                            {weekDates.start + ' - ' + weekDates.end}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.weekBanner}
                onPress={() => setModalVis(!modalVis)}
                key={'wkChange-'+indices.weekIndex}>
                <Text style={styles.weekNum}>{week.workouts.length}</Text>
                <Text style={styles.weekText}>Workouts</Text>
            </TouchableOpacity>
            <ModalChangeWorkout 
                name={week.name} 
                value={week.workouts.length} 
                blockIndex={indices.blockIndex} 
                weekIndex={indices.weekIndex}
                modalVisible={modalVis} 
                setModalVisible={setModalVis}
                planIndex={indices.planIndex}
                dataLabel={'Workout'}
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
    },
    weekNum: {
        fontFamily: 'Raleway-Bold',
        fontSize: 36,
        textAlign: 'center',
    },
    weekText: {
        fontFamily: 'Raleway-Medium',
        fontSize: 12,
        textAlign: 'center',
    }
  });


export default TrainingWeekItem;