import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import { AxiosContext } from '../../datastore/AxiosContext'
import { bgColorSet } from '../helpers/colorSet';


const ForgotPassword = ({navigation}) => {
    const iconColor = bgColorSet("#747ed1")
    const [ email, setEmail] = useState()
    const [ errors, setErrors ] = useState({})


    const {publicAxios} = useContext(AxiosContext);

    const handleForgotPassword = async () => {
        setErrors({})

        try {
            await publicAxios.post('forgot-password', { email })

            navigation.navigate('ResetPassword', { _email: email})
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.headerBanner}>
                <View>
                <Text style={styles.header}>
                    Forgot Password
                </Text>
                <Text style={styles.headerSub}>
                    We want to help you train with intent through periodization and progressive overload!
                </Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.fieldBox}>
                        <Text style={styles.label}>
                            Email
                        </Text>
                        <TextInput
                            autoCapitalize={'none'}
                            style={styles.textField}
                            value={email}
                            onChangeText={(value) => { setEmail(value)}}
                            inputMode="text"
                            keyboardType="email-address" />
                    </View>
                    <Text style={styles.errorLabel}>
                        {errors.email}
                    </Text>     
                    <TouchableOpacity
                        style={Object.assign({}, styles.btnStyling, iconColor)}
                        onPress={() => handleForgotPassword()} >
                        <Text style={styles.RalewayBold}>
                            Submit
                        </Text>
                    </TouchableOpacity>
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
        backgroundColor: 'white',
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
        padding: 5
    },
    RalewayBold: {
        fontFamily: "Raleway-Bold",
        fontSize: 14,
        color: "#FFFFFF",
        textAlign: 'center'
    }
  });

export default ForgotPassword;