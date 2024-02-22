import { View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'

const ExerciseTextField = ({exercise, indices, handleChange, handleAddAllExercise, hideAddExercise}) => {
    return (
        <View style={styles.exerciseSeparator}>
            <View style={styles.lineBox}>
                {hideAddExercise ? 
                    <View style={styles.hideBtnOffset}></View>
                :
                <TouchableOpacity
                        style={Object.assign({}, styles.button, {marginLeft: 30})}
                        onPress={() => handleAddAllExercise(indices.blockIndex, indices.workoutIndex, indices.activityIndex)}
                        key={indices.blockIndex + indices.workoutIndex + '-' + indices.activityIndex}
                    >
                        <Text style={styles.buttonText}>
                        + Exercise
                        </Text>
                    </TouchableOpacity>
                }
                <View style={styles.fieldBox}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.textField}
                        value={exercise.name}
                        onChangeText={(value) => { handleChange(indices.planIndex, indices.blockIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, 'name', value)}}
                        inputMode={'text'}
                        keyboardType={'default'} />
                </View>
            </View>    
            <View style={styles.exerciseUnit}>
                <View style={Object.assign({}, styles.exerciseBoxSide, styles.small)}>
                    <Text style={styles.label}>Sets:</Text>
                    <TextInput
                        style={styles.textField}
                        value={exercise.sets.toString()}
                        onChangeText={(value) => { handleChange(indices.planIndex, indices.blockIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, 'sets', value)}}
                        inputMode={'numeric'}
                        keyboardType={'number-pad'} />
                </View>
                <View style={Object.assign({}, styles.exerciseBox, styles.medium)}>
                    <Text style={styles.label}>Intensity:</Text>
                    <TextInput
                        style={styles.textField}
                        value={exercise.intensity.toString()}
                        onChangeText={(value) => { handleChange(indices.planIndex, indices.blockIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, 'intensity', value)}}
                        inputMode={'decimal'}
                        keyboardType={'decimal-pad'} />
                </View>

                <View style={Object.assign({}, styles.exerciseBoxSide, styles.large)}>
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
                <View style={Object.assign({}, styles.exerciseBox, styles.small)}>
                    <Text style={styles.label}>Reps:</Text>
                    <TextInput
                        style={styles.textField}
                        value={exercise.reps.toString()}
                        onChangeText={(value) => { handleChange(indices.planIndex, indices.blockIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, 'reps', value)}}
                        inputMode={'numeric'}
                        keyboardType={'number-pad'} />
                </View>
                <View style={Object.assign({}, styles.exerciseBox, styles.medium)}>
                
                    <Text style={styles.label}>Rest:</Text>
                    <TextInput
                        style={styles.textField}
                        value={exercise.rest.toString()}
                        onChangeText={(value) => { handleChange(indices.planIndex, indices.blockIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, 'rest', value)}}
                        inputMode={'decimal'}
                        keyboardType={'decimal-pad'} />
                </View>

                <View style={Object.assign({}, styles.exerciseBoxSide, styles.large)}>
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
    lineBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        borderRadius: 10,
        backgroundColor: '#307fb0',
        marginTop: 5,
        marginRight: 'auto',
        marginBottom: 5,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10
    },
    buttonText: {
        fontFamily: 'Raleway-Regular',
        textAlign: 'center',
        color: 'white',
    },
    fieldBox: {
        backgroundColor: 'white',
        marginTop: 10,
        marginRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 10,
        width: '55%'
    },
    exerciseBox: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
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
    small: {
        width: '20%'
    },
    medium: {
        width: '25%'
    },
    large: {
        width: '30%'
    },
    exerciseUnit: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    exerciseSeparator: {
        backgroundColor: '#b9d9ed',
        marginBottom: 10,
        marginTop: 10
    },
    label: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#575757"
    },
    textField: {
        fontFamily: 'Raleway-Regular',
        padding: 5
    },
    hideBtnOffset: {
        marginLeft: 20
    }
})

export default ExerciseTextField