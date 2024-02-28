import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const BoolButton = ({handleChangeDeloadWeek, label, buttonLabel}) => {
    return (
        <View style={styles.fieldBox}>
                <Text style={styles.label}>
                    {label}
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleChangeDeloadWeek()}
                    key={'booleanDeloadBtn'}
                >
                    <Text style={styles.RalewayBold}>
                        {buttonLabel == false ? "No" : "Yes"}
                    </Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    fieldBox: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 10,
    },
    label: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#575757",
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#3f78e0',
        borderRadius: 5,
        width: 35,
        height: 25,
        marginTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto'
    },  
    RalewayBold: {
        fontFamily: "Raleway-Bold",
        fontSize: 14,
        color: "#FFFFFF",
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'

    }
})

export default BoolButton;