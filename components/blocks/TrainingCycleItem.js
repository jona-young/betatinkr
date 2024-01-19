import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { format } from 'date-fns'
import { boxShadowStyle } from '../helpers/boxShadowStyle';

const TrainingCycleItem = ({navigation, cycle, idx, plan}) => {
    const boxShadow = boxShadowStyle(-2, 2, '#000000', 0.2, 3, 4)
    const deloadBox = createDeloadInfo(cycle.deload)

    return (
        <TouchableOpacity
            style={Object.assign({}, styles.boxFrame, boxShadow)}
            onPress={() => navigation.navigate("TrainingCycle-Form", { plan: plan, index: idx})}
            key={idx + '-' + cycle.name}
        >
            <View style={styles.iconCircle}>
                <Text style={styles.iconText}>
                    {/* icon training plan */}
                    {idx + 1}
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
                        {format(cycle.startDate, 'dd-MM-yyyy') + " - " + format(cycle.endDate, 'dd-MM-yyyy')}
                    </Text>
                </View>
            </View>
            <View style={styles.weekBanner}>
                <Text style={styles.weekNum}>{cycle.deload ? cycle.weeks.length - 1 : cycle.weeks.length}</Text>
                <Text style={styles.weekText}>Weeks</Text>
            </View>
            <View style={styles.deloadBanner}>
                {deloadBox}

            </View>
        </TouchableOpacity>
    )
}

const createDeloadInfo = (deload) => {
    if (deload) {
        return (
            <>
                <Text style={styles.weekNum}>1</Text>
                <Text style={styles.weekText}>Deload</Text>
            </>
        )
    } else {
        return (
            <>
                <Text style={styles.weekNo}>NO</Text>
                <Text style={styles.weekText}>Deload</Text>
            </>
        )
    }
}

const styles = StyleSheet.create({
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
        backgroundColor: '#d16b86',
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
        backgroundColor: '#d16b86',
        height: '100%',
        width: '18%',
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
        backgroundColor: '#f8e7ec',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        height: '100%',
        width: '18%'
    }
  });


export default TrainingCycleItem;