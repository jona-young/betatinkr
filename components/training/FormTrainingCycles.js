import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import useForm from '../../datahooks/useForm'
import TrainingCycleItem from '../blocks/TrainingCycleItem';
import SubmitButton from '../blocks/SubmitButton';
import { postTrainingPlan } from '../../datahooks/useTrainingPlans'

const FormTrainingCycles = ({ route, navigation}) => {
    const { plan } = route.params
    const { form, handleChange, createTrainingCycles} = useForm(plan.form)

    useEffect(() => {
        createTrainingCycles(form.weeksPerBlock, true, form.workoutsPerWeek, handleChange)
    },[])

    /* Need to add a button that will take the trainingCycles data structure state
        and apply it to the original form through form(useForm())  */
    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                    <View>
                        <SubmitButton 
                            navigation={navigation}
                            form={form} 
                            bgColor={'#d16b86'}
                            postRoute={postTrainingPlan}
                            redirectRoute={'TrainingPlans'} />
                        <Text>[A button to confirm and create training plan] or users may click each box to setup each week's workouts </Text>
                        {
                            form.blocks.map((cycle, idx) => {
                                return <TrainingCycleItem navigation={navigation} cycle={cycle} idx={idx} plan={form} />
                            })
                        }
                    </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default FormTrainingCycles;