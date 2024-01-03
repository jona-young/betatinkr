import React from 'react'
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';


const TrainingPlan = ({route, navigation}) => {
    const { planName } = route.params
    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View>
                    <Text style={styles.header}>
                        {planName}
                    </Text>
                </View>
                <View>
                    <Text style={styles.header}>
                        Overview
                    </Text>
                    <View style={styles.itemBox}>
                        <Button 
                            style={styles.boxItem} 
                            title="Mesocycle 1 - General Strength"
                            onPress={() => navigation.navigate('TrainingCycle', { cycleName: 'Mesocycle 1 - General Strength'})} />
                        <Button 
                            style={styles.boxItem} 
                            title="Mesocycle 2 - General Power"
                            onPress={() => navigation.navigate('TrainingCycle', { cycleName: 'Mesocycle 2 - General Power'})} />
                        <Button 
                            style={styles.boxItem} 
                            title="Mesocycle 3 - Sport-Specific Strength"
                            onPress={() => navigation.navigate('TrainingCycle', { cycleName: 'Mesocycle 3 - SSP Strength'})} />
                        <Button 
                            style={styles.boxItem} 
                            title="Mesocycle 4 - Sport-Specific Power"
                            onPress={() => navigation.navigate('TrainingCycle', { cycleName: 'Mesocycle 4 - SSP Strength'})} />                                                                                    
                    </View>
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

export default TrainingPlan;