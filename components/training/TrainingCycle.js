import React from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';

  const TrainingCycle = ({ route, navigation }) => {
    const { cycleName } = route.params

    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View>
                    <Text style={styles.header}>
                        {cycleName}
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
                            title="Week 1"
                            onPress={() => navigation.navigate('TrainingWeek', { weekNum: '1'})} />
                        <Button 
                            style={styles.boxItem} 
                            title="Week 2"
                            onPress={() => navigation.navigate('TrainingWeek', { weekNum: '2'})} />
                        <Button 
                            style={styles.boxItem} 
                            title="Week 3"
                            onPress={() => navigation.navigate('TrainingWeek', { weekNum: '3'})} />
                        <Button 
                            style={styles.boxItem} 
                            title="Week 4"
                            onPress={() => navigation.navigate('TrainingWeek', { weekNum: '4'})} />  
                        <Button 
                            style={styles.boxItem} 
                            title="Deload"
                            onPress={() => navigation.navigate('TrainingWeek', { weekNum: 'Deload'})} />                                                                                  
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

export default TrainingCycle;