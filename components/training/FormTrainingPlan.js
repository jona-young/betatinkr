import React, { useContext } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
  } from 'react-native';
import useCreateTrainingPlan from '../../datahooks/useCreateTrainingPlan';
import SubmitButton from '../blocks/inputs/SubmitButton';
import FormFieldGenerator from '../helpers/FormFieldGenerator'
import { AxiosContext } from '../../datastore/AxiosContext'


const FormTrainingPlan = ({navigation}) => {
    const { form, handleChange, handleChangeDeloadWeek} = useCreateTrainingPlan()
    const axiosContext = useContext(AxiosContext)

    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.formBox}>
                    {
                        Object.entries(form).map(([key, value]) => {
                            if (key !== 'blocks') {
                                return <FormFieldGenerator 
                                            key={'formfield-'+key}
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
                        submitFunc={() => axiosContext.postTrainingPlan(form, navigation, 'TrainingPlans')} />
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