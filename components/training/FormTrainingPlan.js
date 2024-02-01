import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
  } from 'react-native';
import useForm from '../../datahooks/useForm';
import SubmitButton from '../blocks/SubmitButton';
import FormFieldGenerator from '../helpers/FormFieldGenerator'
import { postTrainingPlan } from '../../datahooks/useTrainingPlans'


const FormTrainingPlan = ({navigation}) => {
    const { form, handleChange, handleChangeDeloadWeek} = useForm()
    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.formBox}>
                    {
                        Object.entries(form).map(([key, value]) => {
                            if (key !== 'blocks') {
                                return <FormFieldGenerator 
                                            label={key} 
                                            formValue={form[key]} 
                                            handleChange={handleChange} 
                                            valueType={typeof form[key]}
                                            handleChangeDeloadWeek={handleChangeDeloadWeek} />
                            }
                        })    
                    }
                    <SubmitButton 
                        bgColor={'#fab758'}
                        submitFunc={() => postTrainingPlan(form, navigation, 'TrainingPlans')} />
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