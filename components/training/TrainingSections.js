import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import TrainingSection from '../training/TrainingSection'

const TrainingSections = ({ section, idx, indexes, handleChangeExercise}) => {

    return (
        <View key={idx + '-' + section.name} style={styles.sectionBox}>
            <View style={styles.sectionBanner}>
                <Text style={styles.header}>
                    {section.name}
                </Text>
            </View>
            <View style={styles.sectionContent}>
                {
                    section.exercises.map((exercise, idx) => {
                        return (
                            <TrainingSection
                                exercise={exercise}
                                idx={idx}
                                indexes={indexes}
                                handleChangeExercise={handleChangeExercise} />
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

    }
  });

export default TrainingSections