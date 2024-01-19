import React, { useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
  } from 'react-native';
import useForm from '../../datahooks/useForm';
import ButtonItem from '../blocks/ButtonItem';
import FormFieldGenerator from '../helpers/FormFieldGenerator'


const FormTrainingPlan = ({navigation}) => {
    const { form, handleChange} = useForm()

    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View style={styles.formBox}>
                    {
                        Object.entries(form).map(([key, value]) => {
                            if (key !== 'blocks') {
                                return <FormFieldGenerator label={key} formValue={form[key]} handleChange={handleChange} valueType={typeof form[key]} />
                            }
                        })    
                    }
                    <ButtonItem 
                        navigation={navigation}
                        route={'TrainingCycles-Form'} 
                        btnInfo={{name: 'Review Training Cycles', form: form}} 
                        bgColor={'#fab758'}
                        extraStyling={styles.extraBtnStyling} />
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