import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
  } from 'react-native';
import useForm from '../../datahooks/useForm'
import TrainingCycleItem from '../blocks/TrainingCycleItem';


const TrainingPlan = ({route, navigation}) => {
    const { plan } = route.params
    const { form, handleMesoChangeWeek, handleChangeDeload, handleWeekChangeWorkouts, handleUpdateExercise } = useForm(plan.info)

    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                    <View style={styles.banner}>
                        <Text style={styles.header}>
                            {form.name}
                        </Text>
                    </View>
                    <View>
                    {
                        form.blocks.map((cycle, idx) => {
                            return <TrainingCycleItem 
                                        navigation={navigation} 
                                        cycle={cycle} 
                                        idx={idx} 
                                        handleMesoChangeWeek={handleMesoChangeWeek}
                                        handleChangeDeload={handleChangeDeload}
                                        handleWeekChangeWorkouts={handleWeekChangeWorkouts}
                                        cycleStart={cycle.startDate}
                                        plan={form}
                                        handleChangeExercise={handleUpdateExercise} />
                        })
                    }
                    </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#3f78e0',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10
    },
    header: {
        fontFamily: 'Raleway-Bold',
        color: 'white',
        fontSize: 24,
        paddingLeft: 10,
    },
    itemBox: {
        display: 'flex',
        flexDirection: 'column'
    },
    boxItem: {
        paddingLeft: 10,
        fontSize: 12,
        fontWeight: '700',
        backgroundColor: 'black',
        color: 'white',
        marginBottom: 10,
        padding: 10
    },
  });

export default TrainingPlan;