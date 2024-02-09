import { Text, View, TextInput, StyleSheet } from 'react-native';

const InputField = ({ label, formValue, handleChange, inputMode, keyboardType}) => {

    return (
        <View style={styles.fieldBox}>
            <Text style={styles.label}>
                {label}
            </Text>
            <TextInput
                style={styles.textField}
                value={formValue}
                onChangeText={(value) => { handleChange(label, value)}}
                inputMode={inputMode}
                keyboardType={keyboardType} />
         </View>
    )
}

const styles = StyleSheet.create({
    fieldBox: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 10,
    },
    label: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#575757"
    },
    textField: {
        fontFamily: 'Raleway-Regular',
        padding: 5
    }
})

export default InputField;