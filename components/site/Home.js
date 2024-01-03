import React from 'react'
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';


const Home = ({navigation}) => {
    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View>
                    <Text style={styles.header}>
                        Your Training Plans
                    </Text>
                    <Text>
                        What happens if a training plan is just setup as a training cycle? A.K.A. can skip the training plan?
                        Along the same lines what if a training plan is just setup as a training week or day? then you 
                        may skip further levels? but how do you deal with that?
                        {"\n"}
                        {"\n"}
                        Could send onPress to a function that identifies if the next step is a trainingPlan, trainingCycle,
                        trainingWeek, or trainingDay and then redirect accordingly
                    </Text>
                </View>
                <View style={styles.itemBox}>
                    <Button
                        style={styles.boxItem}
                        title="2023 Training Climbing Plan"
                        onPress={() => navigation.navigate('TrainingPlan', { planName: '2023 Training Climbing Plan'})} />
                    <Button
                        style={styles.boxItem}
                        title="2022 Lost Ark Legion Raid Plan"
                        onPress={() => navigation.navigate('TrainingPlan', { planName: '2022 Lost Ark Legion Raid Plan'})} />
                    <Button
                        style={styles.boxItem}
                        title="2021 Fried Rice National Cooking Championships"
                        onPress={() => navigation.navigate('TrainingPlan', { planName: '2021 Fried Rice National Cooking Championships'})} />                    
                    <Button
                        style={styles.boxItem}
                        title="2020 Coffee Grind Spin Cup"
                        onPress={() => navigation.navigate('TrainingPlan', { planName: '2020 Coffee Grind Spin Cup'})} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
      paddingLeft: 10,
      fontSize: 24,
      fontWeight: '700',
      backgroundColor: 'lightblue',
      marginBottom: 10
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
    }
  });

export default Home;