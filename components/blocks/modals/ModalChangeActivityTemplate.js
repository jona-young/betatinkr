import { useContext } from 'react'
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native'
import { AxiosContext } from '../../../datastore/AxiosContext'

const ModalChangeActivityTemplate = ({navigation, id, modalVisible, setModalVisible, setScreenRefresh}) => {
    const axiosContext = useContext(AxiosContext)

    const handleSubmit = () => {
      axiosContext.deleteActivityTemplate(id, navigation, 'TrainingPlans')  
      setModalVisible(!modalVisible)
      setScreenRefresh(true)
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
                    <Text style={styles.modalHeading}>Delete Activity Template?</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleSubmit()}>
                        <Text style={styles.textStyle}>Delete</Text>
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

export default ModalChangeActivityTemplate;