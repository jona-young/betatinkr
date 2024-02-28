import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { AxiosContext } from '../../datastore/AxiosContext'
import { bgColorSet } from '../helpers/colorSet';


const ResetPassword = ({navigation, route}) => {
    const iconColor = bgColorSet("#747ed1")
    const { _email } = route.params

    const [ email, setEmail] = useState(_email)
    const [ resetCode, setResetCode] = useState()
    const [ password, setPassword] = useState()
    const [ confirmPassword, setConfirmPassword] = useState()

    const [ errors, setErrors ] = useState({})

    const {publicAxios} = useContext(AxiosContext);

    const handleResetPassword = async () => {
        setErrors({})

        if (password !== confirmPassword) {
            setErrors({resetCode: '', password: 'Passwords do not match!', confirmPassword: 'Passwords do not match!'})
            return
        }

        try {
            await publicAxios.post('reset-password', { email, resetCode, password })
        
            navigation.navigate('Home')
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.headerBanner}>
                <View>
                <Text style={styles.header}>
                    Reset Password
                </Text>
                <Text style={styles.headerSub}>
                    We want to help you train with intent through periodization and progressive overload!
                </Text>
                </View>
                <View style={styles.form}>
                    <View style={Object.assign({}, styles.fieldBox, { backgroundColor: '#e0e0e0'})}>
                        <Text style={styles.label}>
                            Email
                        </Text>
                        <Text style={styles.textField}>
                            {email}
                        </Text>
                    </View>  
                    <View style={styles.fieldBox}>
                        <Text style={styles.label}>
                            Verification Code
                        </Text>
                        <TextInput
                            style={styles.textField}
                            value={resetCode}
                            onChangeText={(value) => { setResetCode(value)}}
                            inputMode="text"
                            keyboardType="email-address" />
                    </View>
                    <Text style={styles.errorLabel}>
                        {errors.resetCode}
                    </Text>  
                    <View style={styles.fieldBox}>
                        <Text style={styles.label}>
                            Enter Password
                        </Text>
                        <TextInput
                            style={styles.textField}
                            value={password}
                            secureTextEntry
                            onChangeText={(value) => { setPassword(value)}}
                            inputMode="text"
                            keyboardType="email-address" />
                    </View>
                    <Text style={styles.errorLabel}>
                        {errors.password}
                    </Text>  
                    <View style={styles.fieldBox}>
                        <Text style={styles.label}>
                            Confirm Password
                        </Text>
                        <TextInput
                            style={styles.textField}
                            value={confirmPassword}
                            secureTextEntry
                            onChangeText={(value) => { setConfirmPassword(value)}}
                            inputMode="text"
                            keyboardType="email-address" />
                    </View>
                    <Text style={styles.errorLabel}>
                        {errors.confirmPassword}
                    </Text> 
                    <TouchableOpacity
                        style={Object.assign({}, styles.btnStyling, iconColor)}
                        onPress={() => handleResetPassword()} >
                        <Text style={styles.RalewayBold}>
                            Reset Password
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

export default ResetPassword;