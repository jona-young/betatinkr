import { useState, useContext } from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native'
import { handleUpdateExercise, removeExercise } from '../../../datastore/useTrainingStore'
import ExerciseTextField from '../inputs/ExerciseTextField'
import { AxiosContext } from '../../../datastore/AxiosContext'

const ModalChangeExercise = ({exercise, indices, modalVisible, setModalVisible, navigation}) => {
    const [ exerciseData, setExerciseData ] = useState(exercise)
    const axiosContext = useContext(AxiosContext)

    const handleSubmit = () => {
        handleUpdateExercise(axiosContext, indices.planIndex, indices.blockIndex, indices.weekIndex, indices.weekIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, exerciseData, navigation)

        setModalVisible(!modalVisible);
    }

    const handleRemove = () => {
      removeExercise(axiosContext, indices.planIndex, indices.blockIndex, indices.weekIndex, indices.weekIndex, indices.workoutIndex, indices.activityIndex, indices.exerciseIndex, navigation)
      
      setModalVisible(!modalVisible);
    }

    const handleChange = (planIndex, blockIndex, workoutIndex, activityIndex, exerciseIndex, name, value) => {
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
                        indices={indices}
                        handleChange={handleChange} />
                </View>
                <View style={styles.buttonOptions}>
                    <Pressable
                            style={Object.assign({}, styles.button, styles.buttonOpen)}
                            onPress={() => handleSubmit()}>
                            <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                    <Pressable
                            style={Object.assign({}, styles.button, styles.buttonRemove)}
                            onPress={() => handleRemove()}>
                            <Text style={styles.textStyle}>Remove</Text>
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
        justifyContent: 'space-between',
        width: '93%',
        marginBottom: 10,
    },
    button: {
      padding: 5,
      marginBottom: 3,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#2196F3',
      width: 70,
      borderRadius: 5,
    },
    buttonClose: {
      backgroundColor: '#2196F3',
      borderRadius: 5,
      paddingRight: 10,
      paddingLeft: 10
    },
    buttonRemove: {
      backgroundColor: "#de2a1d",
      borderRadius: 5,
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