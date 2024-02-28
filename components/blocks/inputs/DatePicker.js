import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { parseDate } from '../../helpers/adjustTrainingCycleDates'

const DatePicker = ({ label, fieldName, formValue, handleChange }) => {
    const currentDate = parseDate(new Date())
    const minEndDate = new Date().setDate(new Date().getDate() + 1)
    const [ minDate ] = useState(fieldName == "startDate" ? parseDate(currentDate) : parseDate(minEndDate))
    
    return (
        <View style={styles.fieldBox}>
            <Text style={styles.label}>
                {label}
            </Text>
            <DateTimePicker value={formValue} onChange={(event, value) => handleChange(fieldName, value)} minimumDate={minDate} />
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
        width: '40%'
    },
    label: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#575757"
    }
})

export default DatePicker