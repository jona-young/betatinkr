import { useState } from 'react';
import { View, Text, TextInput, Modal, Pressable, StyleSheet } from 'react-native'
import { removeActivity, handleChangeActivityName } from '../../../datastore/useTrainingStore'

const ModalChangeSection = ({activityName, indices, modalVisible, setModalVisible, navigation}) => {
    const [ activity, setActivity ] = useState(activityName)


    const handleSubmit = () => {
        handleChangeActivityName(indices.planIndex, indices.blockIndex, indices.weekIndex, indices.weekIndex, indices.workoutIndex, indices.activityIndex, activity, navigation)

        setModalVisible(!modalVisible);
    }

    const handleRemove = () => {
        removeActivity(indices.planIndex, indices.blockIndex, indices.weekIndex, indices.weekIndex, indices.workoutIndex, indices.activityIndex, navigation) 

        setModalVisible(!modalVisible);
    }

    const handleChange = (value) => {
        setActivity(value)
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
                <View style={styles.fieldBox}>
                    <Text style={styles.label}>
                        Section
                    </Text>
                    <TextInput
                        style={styles.textField}
                        value={activity}
                        onChangeText={(value) => { handleChange(value) }}
                        inputMode={'text'} 
                        keyboardType={'default'} />
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
      width: 280,
      marginTop: 150,
      marginLeft: 40,
      borderRadius: 5,
      paddingLeft:10,
      backgroundColor: '#e0e9fa',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start'
    },
    buttonOptions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 3
    },
    button: {
      padding: 2,
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
      paddingRight: 5,
      paddingLeft: 5
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
    fieldBox: {
      width: 170,
      backgroundColor: 'white',
      marginTop: 10,
      marginRight: 20,
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
  });

export default ModalChangeSection;