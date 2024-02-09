import { useState, useEffect } from 'react'
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native'
import { increment, decrement } from '../../helpers/changeCounter'
import { handleChangeWorkouts } from '../../../datastore/useTrainingStore'

const ModalChangeWorkout = ({name, value, blockIndex, weekIndex, modalVisible, setModalVisible, planIndex, dataLabel, navigation}) => {
    const [ workouts, setWorkouts ] = useState(value)

    const handleSubmit = () => {
      handleChangeWorkouts(planIndex, blockIndex, weekIndex, workouts, navigation)

      setModalVisible(!modalVisible)
    }

    useEffect(() => {
        setWorkouts(value)
    },[value])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalHeading}>{name}</Text>
                    <Text style={styles.modalText}>{workouts + '' + (workouts > 1 ? ' ' + dataLabel + 's' : ' ' + dataLabel) }</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => increment(workouts, setWorkouts)}>
                        <Text style={styles.textStyle}>Add {dataLabel}</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => decrement(workouts, setWorkouts)}>
                        <Text style={styles.textStyle}>Remove {dataLabel}</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleSubmit()}>
                        <Text style={styles.textStyle}>Ok</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'top',
      alignItems: 'center',
      marginTop: 125,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 10,
      padding: 5,
      marginBottom: 3,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
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

export default ModalChangeWorkout;