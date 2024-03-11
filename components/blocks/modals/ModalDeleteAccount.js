import { useContext, useState } from 'react'
import { Modal, View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { AxiosContext } from '../../../datastore/AxiosContext'
import { AuthContext } from '../../../datastore/AuthContext'


const ModalDeleteAccount = ({navigation, modalVisible, setModalVisible, namePass}) => {
    const axiosContext = useContext(AxiosContext)
    const authContext = useContext(AuthContext)

    const [ userPass, setUserPass ] = useState("")
    const [ errors, setErrors ] = useState("")

    const handleSubmit = () => {
        if (namePass !== userPass) {
            setErrors("Your text does not match the outlined code to delete your account.")
        } else {
            axiosContext.deleteAccount(authContext, navigation, 'Home') 
            setModalVisible(!modalVisible)
        }
    }

    const handleClose = () => {
        setErrors("")
        setModalVisible(!modalVisible)
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
                    <Text style={styles.modalHeading}>Delete your account?</Text>
                    <View style={styles.fieldBox}>
                        <Text style={styles.label}>
                            Please enter {namePass} to confirm you wish to delete your account.
                        </Text>
                        <TextInput
                            style={styles.textField}
                            autoCapitalize={'none'}
                            value={userPass}
                            onChangeText={(value) => { setUserPass(value)}}
                            placeholder={'Type here...'}
                            inputMode="text"
                            keyboardType="default" />
                    </View>     
                    <Text style={styles.errorLabel}>
                        {errors}
                    </Text>                
                    <Pressable
                        style={[styles.button, styles.buttonDelete]}
                        onPress={() => handleSubmit()}>
                        <Text style={styles.textStyle}>Delete</Text>
                    </Pressable>
                    <Pressable
                        style={Object.assign({}, styles.button, styles.buttonClose)}
                        onPress={() => handleClose()}>
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
      borderRadius: 20,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 3,
      elevation: 2,
    },
    buttonDelete: {
      backgroundColor: '#de2a1d',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
      marginTop: 20,
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
        backgroundColor: '#f2f2f2',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 10,
        width: "75%"
    },
    label: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#575757",
        marginBottom: 10
    },
    errorLabel: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#de2a1d",
        marginBottom: 10
    },
    textField: {
        fontFamily: 'Raleway-Regular',
        padding: 5,
        color: '#575757'
    },
  });

export default ModalDeleteAccount;