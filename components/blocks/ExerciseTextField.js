import { View, Text, StyleSheet, TextInput} from 'react-native'

const ExerciseTextField = ({exercise, blockIndex, workoutIndex, activitiesIndex, exerciseIndex, handleChangeExercise}) => {

    return (
        <View style={styles.exerciseBox}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.textField}
                value={exercise.name}
                onChangeText={(value) => { handleChangeExercise(blockIndex, 'name', value, workoutIndex, activitiesIndex, exerciseIndex)}}
                inputMode={'text'}
                keyboardType={'default'} />

            <Text style={styles.label}>Reps:</Text>
            <TextInput
                style={styles.textField}
                value={exercise.reps}
                onChangeText={(value) => { handleChangeExercise(blockIndex, 'reps', value, workoutIndex, activitiesIndex, exerciseIndex)}}
                inputMode={'numeric'}
                keyboardType={'number-pad'} />
            
            <Text style={styles.label}>Sets:</Text>
            <TextInput
                style={styles.textField}
                value={exercise.sets}
                onChangeText={(value) => { handleChangeExercise(blockIndex, 'sets', value, workoutIndex, activitiesIndex, exerciseIndex)}}
                inputMode={'numeric'}
                keyboardType={'number-pad'} />
            
            <Text style={styles.label}>Weight/Intensity/Time:</Text>
            <TextInput
                style={styles.textField}
                value={exercise.intensity}
                onChangeText={(value) => { handleChangeExercise(blockIndex, 'intensity', value, workoutIndex, activitiesIndex, exerciseIndex)}}
                inputMode={'text'}
                keyboardType={'default'} />
            
            <Text style={styles.label}>Units:</Text>
            <TextInput
                style={styles.textField}
                value={exercise.units}
                onChangeText={(value) => { handleChangeExercise(blockIndex, 'units', value, workoutIndex, activitiesIndex, exerciseIndex)}}
                inputMode={'text'}
                keyboardType={'default'} />

            <Text style={styles.label}>Rest:</Text>
            <TextInput
                style={styles.textField}
                value={exercise.rest}
                onChangeText={(value) => { handleChangeExercise(blockIndex, 'units', value, workoutIndex, activitiesIndex, exerciseIndex)}}
                inputMode={'numeric'}
                keyboardType={'number-pad'} />
        </View>
    )
}

const styles = StyleSheet.create({
    exerciseBox: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 80,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 10,
    },
    label: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#575757"
    },
    textField: {
        fontFamily: 'Raleway-Regular',
        padding: 5
    }
})

export default ExerciseTextField