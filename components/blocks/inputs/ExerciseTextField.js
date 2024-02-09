import { View, Text, StyleSheet, TextInput} from 'react-native'

const ExerciseTextField = ({exercise, indices, handleChange}) => {
    return (
        <View>
            <View style={styles.exerciseBox}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.textField}
                    value={exercise.name}
                    onChangeText={(value) => { handleChange(indices.planIndex, indices.blockIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, 'name', value)}}
                    inputMode={'text'}
                    keyboardType={'default'} />
            </View>

            <View style={styles.exerciseUnit}>
                <View style={Object.assign({}, styles.exerciseBox, styles.reps)}>
                    <Text style={styles.label}>Reps:</Text>
                    <TextInput
                        style={styles.textField}
                        value={exercise.reps.toString()}
                        onChangeText={(value) => { handleChange(indices.planIndex, indices.blockIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, 'reps', value)}}
                        inputMode={'numeric'}
                        keyboardType={'number-pad'} />
                </View>
                <View style={Object.assign({}, styles.exerciseBoxSide, styles.sets)}>
                    <Text style={styles.label}>Sets:</Text>
                    <TextInput
                        style={styles.textField}
                        value={exercise.sets.toString()}
                        onChangeText={(value) => { handleChange(indices.planIndex, indices.blockIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, 'sets', value)}}
                        inputMode={'numeric'}
                        keyboardType={'number-pad'} />
                </View>
            </View>        

            <View style={styles.exerciseUnit}>
            <View style={Object.assign({}, styles.exerciseBox, styles.intensity)}>
                    <Text style={styles.label}>Intensity:</Text>
                    <TextInput
                        style={styles.textField}
                        value={exercise.intensity.toString()}
                        onChangeText={(value) => { handleChange(indices.planIndex, indices.blockIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, 'intensity', value)}}
                        inputMode={'decimal'}
                        keyboardType={'decimal-pad'} />
                </View>

                <View style={Object.assign({}, styles.exerciseBoxSide, styles.units)}>
                    <Text style={styles.label}>Units:</Text>
                    <TextInput
                        style={styles.textField}
                        value={exercise.units}
                        onChangeText={(value) => { handleChange(indices.planIndex, indices.blockIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, 'units', value)}}
                        inputMode={'text'}
                        keyboardType={'default'} />
                </View>
            </View>
            <View style={styles.exerciseUnit}>
            <View style={Object.assign({}, styles.exerciseBox, styles.rest)}>
                    <Text style={styles.label}>Rest:</Text>
                    <TextInput
                        style={styles.textField}
                        value={exercise.rest.toString()}
                        onChangeText={(value) => { handleChange(indices.planIndex, indices.blockIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, 'rest', value)}}
                        inputMode={'decimal'}
                        keyboardType={'decimal-pad'} />
                </View>

                <View style={Object.assign({}, styles.exerciseBoxSide, styles.restUnits)}>
                    <Text style={styles.label}>Rest Units:</Text>
                    <TextInput
                        style={styles.textField}
                        value={exercise.restUnits}
                        onChangeText={(value) => { handleChange(indices.planIndex, indices.blockIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, 'restUnits', value)}}
                        inputMode={'text'}
                        keyboardType={'default'} />
                </View>
            </View>
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
    exerciseBoxSide: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 0,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 10,
    },
    reps: {
        width: '35%'
    },
    sets: {
        width: '30%'
    },
    intensity: {
        width: '35%'
    },
    units: {
        width: '30%'
    },
    rest: {
        width: '35%'
    },
    restUnits: {
        width: '30%'
    },
    exerciseUnit: {
        display: 'flex',
        flexDirection: 'row'
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