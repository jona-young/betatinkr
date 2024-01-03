import React from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';

  const TrainingWeek = ({ route, navigation }) => {
    const { weekNum } = route.params

    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View>
                    <Text style={styles.header}>
                        {weekNum}
                    </Text>
                </View>
                <View>
                    <Text style={styles.header}>
                        Progress
                    </Text>
                    <Text style={styles.header}>
                        Aesthetic Progress Bar
                    </Text>
                    <View style={styles.itemBox}>
                        <Button 
                            style={styles.boxItem} 
                            title="Workout 1 - Project Climb & Finger Strength"
                            onPress={() => navigation.navigate('TrainingDay', { trainingDay: 'Workout 1 - Project Climb & Finger Strength'})} />
                        <Button 
                            style={styles.boxItem} 
                            title="Workout 2 - Capacity Climb 4x4-2.5"
                            onPress={() => navigation.navigate('TrainingDay', { trainingDay: 'Workout 2 - Capacity Climb 4x4-2.5'})} />
                        <Button 
                            style={styles.boxItem} 
                            title="Workout 3 - Project Climb & Finger Strength"
                            onPress={() => navigation.navigate('TrainingDay', { trainingDay: 'Workout 3 - Project Climb & Finger Strength'})} />
                        <Button 
                            style={styles.boxItem} 
                            title="Workout 4 - Capacity Climb 4x4-2.5"
                            onPress={() => navigation.navigate('TrainingDay', { trainingDay: 'Workout 4 - Capacity Climb 4x4-2.5'})} />                                                                                  
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

export default TrainingWeek;