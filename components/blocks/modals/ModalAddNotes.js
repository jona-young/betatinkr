import { useState, useContext } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import { handleChangeWorkoutField } from '../../../datastore/useTrainingStore'
import { AxiosContext } from '../../../datastore/AxiosContext'

const ModalAddNotes = ({trainingNotes, indices, modalVisible, setModalVisible, navigation}) => {
    const [ workoutNotes, setWorkoutNotes ] = useState(trainingNotes)
    const axiosContext = useContext(AxiosContext)

    const handleSubmit = () => {
        handleChangeWorkoutField(axiosContext, indices.planIndex, indices.blockIndex, indices.workoutIndex, 'notes', workoutNotes, navigation)
        setModalVisible(!modalVisible);
    }

    const handleClearNotes = () => {
      handleChangeWorkoutField(axiosContext, indices.planIndex, indices.blockIndex, indices.workoutIndex, 'notes', "", navigation)
      setWorkoutNotes("")
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
              <View style={styles.sectionContent}>
                  <Text style={styles.label}>Type Your Notes Here:</Text>
                  <TextInput
                      style={styles.textField}
                      value={workoutNotes}
                      onChangeText={(value) => { setWorkoutNotes(value)}}
                      multiline={true}
                      placeholder={"Place your reflections and thoughts about your workout here..."}
                      inputMode={'text'}
                      keyboardType={'default'} />
              </View>
              <View style={styles.btnLayout}>
                    <TouchableOpacity
                    style={Object.assign({}, styles.extraBtnStyling, { backgroundColor: "#fab758" })}
                    onPress={() => handleSubmit()} >
                        <Text style={styles.textStyle}>
                            Save
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={Object.assign({}, styles.extraBtnStyling, { backgroundColor: "#f54518" })}
                    onPress={() => handleClearNotes()} >
                        <Text style={styles.textStyle}>
                            Clear
                        </Text>
                    </TouchableOpacity>
                    <Pressable
                    style={Object.assign({}, styles.extraBtnStyling, { backgroundColor: '#2196F3' })}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>x</Text>
                  </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
      width: 300,
      marginTop: 150,
      marginLeft: 20,
      paddingLeft:10,
      paddingBottom: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start'
    },
    buttonOptions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 3
    },
    buttonRemove: {
      backgroundColor: "#de2a1d",
      borderRadius: 5,
    },
    exitBtnLayout: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: "center",
      marginTop: 5
    },
    btnLayout: {
      width: 290,
      borderRadius: 8,
      backgroundColor: "#a3b5d9",
      padding: 5,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    extraBtnStyling: {
        width: 50,
        padding: 5,
        borderRadius: 5,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 12
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
        color: "#575757",
        marginBottom: 5
    },
    textField: {
        fontFamily: 'Raleway-Regular',
        padding: 5,
        height: 300,
        width: 260
    },
    sectionContent: {
      backgroundColor: '#e0e9fa',
      borderRadius: 8,
      marginRight: 10,
      padding: 15
    },
  });

export default ModalAddNotes;