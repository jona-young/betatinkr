import React, { useState, useContext, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { AxiosContext } from '../../datastore/AxiosContext'
import { bgColorSet } from '../helpers/colorSet';
import ModalDeleteAccount from '../blocks/modals/ModalDeleteAccount';


const Profile = ({navigation}) => {
    const [screenActive, setScreenActive ] = useState(true)
    const [ modalDelete, setModalDelete ] = useState(false)
    const [ profile, setProfile ] = useState({ firstName: "", lastName: ""})
    const iconColor = bgColorSet("#de2a1d")

    const axiosContext = useContext(AxiosContext)

    useFocusEffect(useCallback(() => {        
        const getUserProfileData = () => {
            axiosContext.getProfileInformation(setProfile)
        }

        getUserProfileData()

        return () => {
            setScreenActive(false)
        }
    },[screenActive]))

    return (
        <SafeAreaView>
            <View style={styles.headerBanner}>
                <View>
                <Text style={styles.header}>
                    Profile
                </Text>
                <Text style={styles.headerSub}>
                    We want to help you train with intent through periodization and progressive overload!
                </Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.fieldBox}>
                        <Text style={styles.label}>
                            First Name
                        </Text>
                        <Text style={styles.textField} >
                            {profile.firstName}
                        </Text>
                    </View>
                    <View style={styles.fieldBox}>  
                        <Text style={styles.label}>
                            Last Name
                        </Text>
                        <Text style={styles.textField} >
                            {profile.lastName}
                        </Text>
                    </View>
                    <View style={styles.fieldBox}>
                        <Text style={styles.label}>
                            Email
                        </Text>
                        <Text style={styles.textField} >
                            {profile.email}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={Object.assign({}, styles.btnStyling, iconColor)}
                        onPress={() => setModalDelete(!modalDelete)}>
                        <Text style={styles.RalewayBold}>
                            Delete Account!
                        </Text>
                    </TouchableOpacity>
                    <ModalDeleteAccount 
                        navigation={navigation}
                        modalVisible={modalDelete} 
                        setModalVisible={setModalDelete}
                        namePass={profile.firstName.toLowerCase() + "-" + profile.lastName.toLowerCase()} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerBanner: {
        height: '100%',
        backgroundColor: '#e9eaf8'
    },
    header: {
      fontFamily: 'Raleway-Bold',
      fontSize: 24,
      marginTop: 20,
      marginBottom: 15,
      color: '#747ed1',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    headerSub: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 18,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        color: "#000000",
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    btnStyling: {
        marginTop: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '50%',
        marginBottom: 5,
        padding: 10,
        color: 'white',
        borderRadius: 10,
    },
    form: {
        height: 300, 
        width: '100%',       
        marginTop: 20,
        backgroundColor: '#e9eaf8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
        color: "#575757"
    },
    errorLabel: {
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: "#de2a1d"
    },
    textField: {
        fontFamily: 'Raleway-Regular',
        padding: 5,
        color: '#575757'
    },
    RalewayBold: {
        fontFamily: "Raleway-Bold",
        fontSize: 14,
        color: "#FFFFFF",
        textAlign: 'center'
    }
  });

export default Profile;