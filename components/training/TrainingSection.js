import { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import ModalChangeExercise from '../blocks/ModalChangeExercise'


const TrainingSection = ({ exercise, idx, indexes, handleChangeExercise }) => {
    const [ modalVis, setModalVis ] = useState(false)

    return (
        <TouchableOpacity 
        onPress={() => setModalVis(!modalVis)}
        key={'wkChange-'+idx}>
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
                <Text style={styles.unitsItem}>
                    {exercise.intensity.toString() + ' ' + exercise.units}
                </Text> 
                <Text style={styles.unitsItem}>
                    {exercise.rest.toString() + ' ' + exercise.restUnits}
                </Text>
            </View>
            <ModalChangeExercise 
            exercise={exercise}
            blockIndex={indexes.blockIndex} 
            weekIndex={indexes.weekIndex} 
            workoutIndex={indexes.workoutIndex} 
            activityIndex={indexes.activityIndex} 
            exerciseIndex={idx} 
            modalVisible={modalVis} 
            setModalVisible={setModalVis}
            handleChangeExercise={handleChangeExercise} />
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
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
        width: '40%'
    },
    boxItem: {
        fontFamily: 'Raleway-Medium',
        fontSize: 12,
        color: '#3f78e0',
        paddingTop: 10,
        paddingBottom: 10,
        width: '10%',
        textAlign: 'center',
    },
    unitsItem: {
        fontFamily: 'Raleway-Medium',
        fontSize: 12,
        color: '#3f78e0',
        paddingTop: 10,
        paddingBottom: 10,
        width: '20%',
        textAlign: 'center',
    },
})

export default TrainingSection;