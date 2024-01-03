import React from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';

  const TrainingDay = ({ route, navigation }) => {
    const { trainingDay } = route.params

    return (
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
                <View>
                    <Text style={styles.header}>
                        {trainingDay}
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
                        <View>
                            <Text style={styles.header}>
                                Warm Up
                            </Text>   
                            <Text style={styles.boxItem}>
                                Full Depth Squat Hold
                            </Text>  
                            <Text style={styles.boxItem}>
                                Kneeling Shin Stretch
                            </Text>  
                            <Text style={styles.boxItem}>
                                Open Hip Mobility - Frog Pose
                            </Text>  
                            <Text style={styles.boxItem}>
                                Shoulder Mobility
                            </Text>   
                        </View>
                        <View>
                            <Text style={styles.header}>
                                Finger Strength
                            </Text>  
                            <Text style={styles.boxItem}>
                                3 x 4 - 20MM Half Crimp
                            </Text>  
                            <Text style={styles.boxItem}>
                                3 x 4 - 22.5lb Pinch Block
                            </Text>  
                        </View>
                        <View>
                            <Text style={styles.header}>
                                Project Climbing
                            </Text> 
                            <Text style={styles.boxItem}>
                                1.5Hr Project & Limit Bouldering
                            </Text>                             
                        </View>
                        <View>
                            <Text style={styles.header}>
                                Cooldown
                            </Text> 
                            <Text style={styles.boxItem}>
                                3 x 8 - 35lb Reverse Wrist Curls
                            </Text>   
                        </View>                                                                                                                                                                              
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

export default TrainingDay;