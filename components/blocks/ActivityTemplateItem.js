import { useState } from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { boxShadowStyle } from '../helpers/boxShadowStyle';
import ModalChangeActivityTemplate from '../blocks/modals/ModalChangeActivityTemplate'

const TrainingPlanItem = ({navigation, template, iconText, indices, setScreenRefresh}) => {
    const [ modalVis, setModalVis ] = useState(false)
    const boxShadow = boxShadowStyle(-2, 2, '#000000', 0.2, 3, 4)

    return (
        <View style={styles.itemBox}>
            <TouchableOpacity
                style={Object.assign({}, styles.boxFrame, boxShadow)}
                onPress={() => navigation.navigate("ActivityTemplate", { indices: indices})}
            >
                <View style={styles.iconCircle}>
                    <Text style={styles.iconText}>
                        {/* icon training plan */}
                        {iconText}
                    </Text>
                </View>
                <View style={styles.textFrame}>
                    <Text style={styles.headerName}>
                        {/* training plan name */}
                        {template.name}
                    </Text>
                    <Text style={styles.subHeaderName} numberOfLines={1}>
                        {/* training plan name */}
                        Exercises: {template.exercises.length}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.weekBanner}
                onPress={() => setModalVis(!modalVis)} >
                <Text style={styles.weekText}>Options</Text>
            </TouchableOpacity>
            <ModalChangeActivityTemplate 
                navigation={navigation}
                id={template._id}
                modalVisible={modalVis} 
                setModalVisible={setModalVis}
                setScreenRefresh={setScreenRefresh} />
        </View>
    )
}

const styles = StyleSheet.create({
    itemBox: {
        display: 'flex',
        flexDirection: 'column',
    },
    boxFrame: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left',
        paddingLeft: 15,
        paddingBottom: 5,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 5,
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
        width: '75%'
    },
    headerName: {
        fontFamily: "Raleway-Bold",
        fontSize: 16,
        color: "#000000",
        textAlign: 'left'
    },
    subHeaderName: {
        fontFamily: "Raleway-Regular>",
        fontSize: 12,
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
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#3f78e0',
        width: '95%',
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