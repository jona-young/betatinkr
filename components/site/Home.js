import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import * as Keychain from 'react-native-keychain'
import { AuthContext } from '../../datastore/AuthContext'
import {AxiosContext} from '../../datastore/AxiosContext'
import ButtonItem from '../blocks/inputs/ButtonItem'
import { bgColorSet } from '../helpers/colorSet';


const Home = ({navigation}) => {
    const iconColor = bgColorSet("#747ed1")
    const [ email, setEmail] = useState()
    const [ password, setPassword ] = useState()
    const {publicAxios} = useContext(AxiosContext);
    const authContext = useContext(AuthContext)

    const handleLogin = async () => {
        try {
            const response = await publicAxios.post('login', { email, password})

            const { accessToken, refreshToken } = response.data
            
            authContext.setAllTokens({accessToken: accessToken, refreshToken: refreshToken, authenticated: true})

            await Keychain.setGenericPassword('token', JSON.stringify({accessToken, refreshToken}))
        } catch (err) {
            console.log(err)
            Alert.alert('Login Unsuccessful')
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.headerBanner}>
                <Text style={styles.header}>
                    Login
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
                        style={styles.textField}
                        value={email}
                        onChangeText={(value) => { setEmail(value)}}
                        inputMode="text"
                        keyboardType="email-address" />
                </View>
                <View style={styles.fieldBox}>  
                    <Text style={styles.label}>
                        Password
                    </Text>
                    <TextInput
                        style={styles.textField}
                        value={password}
                        secureTextEntry
                        onChangeText={(value) => { setPassword(value)}}
                        inputMode="text"
                        keyboardType="default" />
                </View>
                <TouchableOpacity
                    style={Object.assign({}, styles.btnStyling, iconColor)}
                    onPress={() => handleLogin()} >
                    <Text style={styles.RalewayBold}>
                        Login
                    </Text>
                </TouchableOpacity>
                <ButtonItem 
                    navigation={navigation} 
                    route={'Signup'} 
                    btnInfo={{name: 'Signup'}} 
                    bgColor={'#fab758'} 
                    extraStyling={styles.extraBtnStyling} />
            </View>
            <View style={styles.imgBox}>
                <Image source={require('../../assets/imgs/about-img.png')}
                        style={styles.imgBanner} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerBanner: {
        height: 250,
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
    imgBox: {
        marginTop: 0,
        paddingBottom: 20,
        backgroundColor: '#e9eaf8'
    },
    imgBanner: {
        height: 300,
        width: 'auto'
    },
    extraBtnStyling: {
        marginTop: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '50%',
        marginBottom: 5,
        padding: 10,
        color: 'white',
        borderRadius: 10,
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
        marginTop: -100,
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

export default Home;