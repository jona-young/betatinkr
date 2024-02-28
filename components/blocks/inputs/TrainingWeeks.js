import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import BoolButton from './BoolButton';
import InputField from './InputField';

const TrainingWeeks = ({weeksPerBlock, deload, workoutsPerWeek, handleChange, handleChangeDeloadWeek, errorWeeks, errorWorkouts}) => {
    console.log(deload)
    return (
        <>
            <View style={styles.weekRow}>
                <InputField 
                    label={"Training Weeks"} 
                    fieldName={"weeksPerBlock"}
                    formValue={weeksPerBlock} 
                    handleChange={handleChange}
                    inputMode={'numeric'} 
                    keyboardType={'number-pad'} />
                <BoolButton 
                    handleChangeDeloadWeek={handleChangeDeloadWeek} 
                    label={"Deload"}
                    buttonLabel={deload} />
                <InputField 
                    label={"Workouts per Week"} 
                    fieldName={"workoutsPerWeek"}
                    formValue={workoutsPerWeek} 
                    handleChange={handleChange}
                    inputMode={'numeric'} 
                    keyboardType={'number-pad'} />
            </View>

            <View style={styles.indentMargin}>
                <Text style={styles.label}>
                    Total Training Weeks = {parseInt(weeksPerBlock) + (deload ? 1: 0)}
                </Text>
                <Text style={styles.errorLabel}>
                    {errorWeeks}
                    {errorWorkouts}
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    weekRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    indentMargin: {
        marginLeft: 20
    }, 
    errorLabel: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#de2a1d"
    },
    label: {
        fontFamily: 'Raleway-Regular',
        fontSize: 14,
        color: "#000000",
        marginBottom: 10
    },
})

export default TrainingWeeks