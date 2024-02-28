import { Text, View, TextInput, StyleSheet } from 'react-native';

const InputField = ({ label, fieldName, formValue, handleChange, inputMode, keyboardType, error}) => {
    return (
        <>
            <View style={styles.fieldBox}>
                <Text style={styles.label}>
                    {label}
                </Text>
                <TextInput
                    style={styles.textField}
                    value={formValue}
                    onChangeText={(value) => { handleChange(fieldName, value)}}
                    inputMode={inputMode}
                    keyboardType={keyboardType} />
            </View>
            { error ?
                <View style={styles.indentMargin}>
                    <Text style={styles.errorLabel}>
                        {error}
                    </Text>
                </View>
            :
                <View></View>
            }
        </>   
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
    indentMargin: {
        marginLeft: 20
    }, 
    errorLabel: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#de2a1d"
    },
    textField: {
        fontFamily: 'Raleway-Regular',
        padding: 5
    }
})

export default InputField;