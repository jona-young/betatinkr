import { useState, useContext } from 'react'
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import { AxiosContext } from '../../../datastore/AxiosContext'
import { useActivityTemplateStore } from '../../../datastore/useActivityTemplateStore'

const ModalSaveTemplate = ({navigation, modalVisible, setModalVisible, section}) => {
    const axiosContext = useContext(AxiosContext)
    const [ sectionName, setSectionName ] = useState(section.name)
    const updateActivityTemplates = useActivityTemplateStore((state) => state.updateActivityTemplates)
    const [ errors, setErrors ] = useState({})

    const handleSubmit = () => {
        let updatedSection = { ...section, name: sectionName }
        axiosContext.postActivityTemplate(updatedSection, navigation, "#", setErrors, updateActivityTemplates)  
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
                    <Text style={styles.modalHeading}>Save as Template?</Text>
                    <View style={styles.fieldBox}>
                        <Text style={styles.label}>Name:</Text>
                        <TextInput
                            style={styles.textField}
                            value={sectionName}
                            onChangeText={(value) => { setSectionName(value)}}
                            inputMode={'text'}
                            keyboardType={'default'} />
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleSubmit()}>
                        <Text style={styles.textStyle}>Save</Text>
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
      padding: 15,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: 300
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
    fieldBox: {
        backgroundColor: '#e0e9fa',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 10,
        width: '100%'
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
  });

export default ModalSaveTemplate;