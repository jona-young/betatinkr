import { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native'
import ExerciseTextField from '../blocks/ExerciseTextField'

// onClick of an exercise in a section, change the name, reps, sets, intensity, units, rest, rest units
// block index, week index, workoutindex, activitiesindex, section index, exercise index
// form listing exercise name, reps, sets, intensity, units, rest,rest units, submit button
// handleSubmit updated with handleChangeExercise equivalent function
const ModalChangeExercise = ({exercise, 
                              blockIndex,
                              weekIndex,
                              workoutIndex,
                              activityIndex,
                              exerciseIndex,
                              modalVisible, 
                              setModalVisible, 
                              handleChangeExercise }) => {

    const [ exerciseData, setExerciseData ] = useState(exercise)

    // currently any changes to the text box updates handlesubmit which automatically closes the window as per setModalVisible
    // create custom state and handleChange function to this modal then add a 'submit' button which triggers handleSubmit()
    // at which point the state will be applied to the workout for each field changed in a loop of sorts?
    const handleSubmit = () => {
        handleChangeExercise(blockIndex, exerciseData, workoutIndex, activityIndex, exerciseIndex, weekIndex, weekIndex)

        setModalVisible(!modalVisible);
    }

    const handleChange = (blockIndex, name, value, workoutIndex, activitiesIndex, exerciseIndex) => {
        setExerciseData({...exerciseData, [name]: value})
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView}>
                <View style={styles.offsetETF}>
                    <ExerciseTextField
                        exercise={exerciseData}
                        blockIndex={blockIndex}
                        workoutIndex={workoutIndex} 
                        activitiesIndex={activityIndex} 
                        exerciseIndex={exerciseIndex} 
                        handleChangeExercise={handleChange} />
                </View>
                <View style={styles.buttonOptions}>
                    <Pressable
                            style={Object.assign({}, styles.button, styles.buttonOpen)}
                            onPress={() => handleSubmit()}>
                            <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                    <Pressable
                        style={Object.assign({}, styles.button, styles.buttonClose)}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>X</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
      width: 275,
      marginTop: 150,
      marginRight: 40,
      marginLeft: 40,
      borderRadius: 10,
      paddingTop:0,
      paddingLeft: 15,
      backgroundColor: '#e0e9fa',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start'
    },
    offsetETF: {
        marginLeft: -80
    },
    buttonOptions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10
    },
    button: {
      padding: 5,
      marginBottom: 3,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
      width: 70,
      marginBottom: 0,
      borderRadius: 5,
      marginRight: 15,
      marginLeft: 40
    },
    buttonClose: {
      backgroundColor: '#2196F3',
      borderRadius: 5,
      paddingRight: 10,
      paddingLeft: 10
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalHeading: {
        fontFamily: "Raleway-Bold",
        fontSize: 16,
        color: "#000000",
        textAlign: 'center',
        marginBottom: 5
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

export default ModalChangeExercise;