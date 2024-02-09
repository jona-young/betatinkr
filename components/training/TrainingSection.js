import { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import ModalChangeExercise from '../blocks/modals/ModalChangeExercise'

const TrainingSection = ({ exercise, indices, navigation }) => {
    const [ modalVis, setModalVis ] = useState(false)

    return (
        <TouchableOpacity 
        onPress={() => setModalVis(!modalVis)}
        key={'wkChange-'+indices.exerciseIndex}>
            <View style={styles.itemBox}>
                <Text style={Object.assign({}, styles.exerciseItem, styles.exerciseName)} numberOfLines={1}>
                    {exercise.name}
                </Text> 
                <Text style={Object.assign({}, styles.boxItem, styles.boxText)}>
                    {exercise.sets}
                </Text> 
                <Text style={Object.assign({}, styles.boxItem, styles.boxText)}>
                    {exercise.reps}
                </Text> 
                <Text style={Object.assign({}, styles.unitsItem, styles.unitsText)}>
                    {exercise.intensity + ' ' + exercise.units}
                </Text> 
                <Text style={Object.assign({}, styles.unitsItem, styles.unitsText)}>
                    {exercise.rest + ' ' + exercise.restUnits}
                </Text>
            </View>
            <ModalChangeExercise 
            exercise={exercise}
            indices={indices}
            modalVisible={modalVis} 
            setModalVisible={setModalVis}
            navigation={navigation} />
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    itemBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    exerciseItem: {
        fontSize: 12,
        color: '#3f78e0',
        width: '40%',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,

    },
    exerciseName: {
        fontFamily: 'Raleway-Medium',
    },
    boxItem: {
        fontSize: 12,
        color: '#3f78e0',
        width: '10%',
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    boxText: {
        fontFamily: 'Raleway-Medium',
    },
    unitsItem: {
        fontSize: 12,
        color: '#3f78e0',
        paddingTop: 5,
        paddingBottom: 5,
        width: '20%',
        textAlign: 'center',
    },
    unitsText: {
        fontFamily: 'Raleway-Medium',
    },
})

export default TrainingSection;