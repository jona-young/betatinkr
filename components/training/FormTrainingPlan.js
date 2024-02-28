import React, { useState, useContext } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
  } from 'react-native';
import useCreateTrainingPlan from '../../datahooks/useCreateTrainingPlan';
import SubmitButton from '../blocks/inputs/SubmitButton';
import { AxiosContext } from '../../datastore/AxiosContext'
import InputField from '../blocks/inputs/InputField';
import StartEndDatePicker from '../blocks/inputs/StartEndDatePicker';
import TrainingWeeks from '../blocks/inputs/TrainingWeeks';


const FormTrainingPlan = ({navigation}) => {
    const currentDate = new Date()
    const { form, handleChange, handleChangeDeloadWeek} = useCreateTrainingPlan(currentDate.setDate(currentDate.getDate() + 1))
    const axiosContext = useContext(AxiosContext)
    const [ errors, setErrors ] = useState({})

    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.formBox}>
                    <InputField 
                        label={"name"} 
                        fieldName={"name"}
                        formValue={form.name} 
                        handleChange={handleChange} 
                        inputMode={'text'} 
                        keyboardType={'default'}
                        error={errors.name} />
                    <InputField 
                        label={"Activity"} 
                        fieldName={"activityType"}
                        formValue={form.activityType} 
                        handleChange={handleChange} 
                        inputMode={'text'} 
                        keyboardType={'default'}
                        error={errors.activityType} />
                    <StartEndDatePicker
                        startValue={form.startDate}
                        endValue={form.endDate}
                        handleChange={handleChange} />
                    <TrainingWeeks
                        weeksPerBlock={form.weeksPerBlock.toString()}
                        deload={form.deloadWeek}
                        workoutsPerWeek = {form.workoutsPerWeek.toString()}
                        handleChange={handleChange}
                        handleChangeDeloadWeek={handleChangeDeloadWeek}
                        errorWeeks={errors.weeksPerBlock} 
                        errorWorkouts={errors.workoutsPerWeek} />
                    <SubmitButton 
                        bgColor={'#fab758'}
                        submitFunc={() => axiosContext.postTrainingPlan(form, navigation, 'TrainingPlans', setErrors)} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    formBox: {
        paddingTop: 20
    },
    extraBtnStyling: {
        marginTop: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '45%',
        padding: 10,
    }
})

export default FormTrainingPlan;