import { useState, useContext } from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native'
import { handleCopyWorkout } from '../../../datastore/useTrainingStore'
import { AxiosContext } from '../../../datastore/AxiosContext'

const ModalCopyWorkout = ({indices, modalVisible, setModalVisible, navigation}) => {
    const axiosContext = useContext(AxiosContext)

    const handleSubmit = (overloadValue) => {
        handleCopyWorkout(axiosContext, indices.planIndex, indices.blockIndex, indices.weekIndex, indices.workoutIndex, overloadValue, navigation)

        setModalVisible(!modalVisible);
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
                        <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalHeading}>Copy Workout from Last Week?</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleSubmit(1)}>
                        <Text style={styles.textStyle}>Copy Workout</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleSubmit(1.025)}>
                        <Text style={styles.textStyle}>Copy & Add 2.5% Intensity</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleSubmit(1.05)}>
                        <Text style={styles.textStyle}>Copy & Add 5% Intensity</Text>
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
        marginBottom: 20
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });


export default ModalCopyWorkout;