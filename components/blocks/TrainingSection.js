import React from 'react';
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';

const TrainingSection = ({ section, idx}) => {
    return (
        <View key={idx + '-' + section.name} style={styles.sectionBox}>
            <View style={styles.sectionBanner}>
                <Text style={styles.header}>
                    {section.name}
                </Text>
            </View>
            <View style={styles.sectionContent}>
                {
                    section.exercises.map((exercise) => {
                        return (
                            <View style={styles.itemBox}>
                                <Text style={styles.exerciseName} numberOfLines={1}>
                                    {exercise.name}
                                </Text> 
                                <Text style={styles.boxItem}>
                                    {exercise.sets}
                                </Text> 
                                <Text style={styles.boxItem}>
                                    {exercise.reps}
                                </Text> 
                            </View>

                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionBox: {
        marginLeft: 10,
        marginRight: 10
    },
    sectionBanner: {
        backgroundColor: '#3f78e0',
        paddingTop: 10,
        paddingLeft: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    sectionContent: {
        backgroundColor: '#e0e9fa',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginBottom: 10
    },
    header: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 18,
        marginBottom: 10,
        color: 'white',

    },
    itemBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    exerciseName: {
        fontFamily: 'Raleway-Medium',
        fontSize: 12,
        color: '#3f78e0',
        padding: 10,
        width: '60%'
    },
    boxItem: {
        fontFamily: 'Raleway-Medium',
        fontSize: 12,
        color: '#3f78e0',
        padding: 10,
        width: '13%'
    }
  });

export default TrainingSection