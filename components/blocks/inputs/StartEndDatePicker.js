import {
    StyleSheet,
    View,
} from 'react-native';
import DatePicker from './DatePicker'


const StartEndDatePicker = ({startValue, endValue, handleChange}) => {
    return (
        <View style={styles.dateRow}>
            <DatePicker 
            label={"Start Date"}
            fieldName={"startDate"}
            formValue={startValue}
            handleChange={handleChange} />
            <DatePicker 
            label={"End Date"} 
            fieldName={"endDate"}
            formValue={endValue} 
            handleChange={handleChange} />
        </View> 
    )
}

const styles = StyleSheet.create({
    dateRow: {
        display: 'flex',
        flexDirection: 'row'
    }
})

export default StartEndDatePicker