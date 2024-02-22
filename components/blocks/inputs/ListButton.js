import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { boxShadowStyle } from '../../helpers/boxShadowStyle';
import { bgColorSet } from '../../helpers/colorSet';

const ListButton = ({navigation, route, planInfo, idx, _iconColor, supplementaryInfo, indices}) => {
    const boxShadow = boxShadowStyle(-2, 2, '#000000', 0.2, 3, 4)
    const iconColor = bgColorSet(_iconColor)

    return (
        <TouchableOpacity
            style={Object.assign({}, styles.boxFrame, boxShadow)}
            onPress={() => navigation.navigate(route, { indices: indices})}
            key={idx + '--LB'}
        >
            <View style={Object.assign({}, styles.iconCircle, iconColor)}>
                <Text style={styles.iconText}>
                    {/* icon training plan */}
                    {idx}
                </Text>
            </View>
            <View style={styles.textFrame}>
                <View>
                    <Text style={styles.headerName}>
                        {/* training plan name */}
                        {planInfo && planInfo.info ? planInfo.info.name : ""}
                    </Text>
                </View>
                <View style={styles.headerSub}>
                    <Text style={styles.subText}>
                        {/* training plan dates or location */}
                        {supplementaryInfo}
                    </Text>
                </View>
            </View>  
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    boxFrame: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left',
        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 5,
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
        borderRadius: 100
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
  });


export default ListButton;