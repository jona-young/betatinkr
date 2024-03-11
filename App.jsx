import React, { useCallback, useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './components/site/TabNavigation';
import Home from './components/site/Home';
import Loading from './components/site/Loading'
import Signup from './components/site/Signup'
import ForgotPassword from './components/site/ForgotPassword'
import ResetPassword from './components/site/ResetPassword'
import { AuthContext } from './datastore/AuthContext'
import * as Keychain from 'react-native-keychain';

const Stack = createNativeStackNavigator();




const App = () => {
  const [ status, setStatus ] = useState('loading');
  const authContext = useContext(AuthContext)
  const authenticated = authContext.authData.authenticated
  
  const loadJWT = useCallback(async (updateStatus) => {
    try {
      const value = await Keychain.getGenericPassword()
      const jwt = JSON.parse(value.password);

      authContext.setAllTokens({accessToken: jwt.accessToken || null, refreshToken: jwt.refreshToken, authenticated: jwt.accessToken!== null})

      updateStatus('complete')
    } catch (err) {
      updateStatus('incomplete')

      authContext.resetTokens()
    }
  }, [])

  useEffect(() => {
      loadJWT(setStatus)
  },[loadJWT])

  return (
    <>
      { status == "loading" ?
      <Loading />
      :
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TabNavigation" >
        { !authenticated ?
          <>
            <Stack.Screen name="Home" component={Home} options={{ title:'BetaTinkr'}} />
            <Stack.Screen name="Signup" component={Signup} options={{ title:'BetaTinkr'}} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title:'BetaTinkr'}} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title:'BetaTinkr'}} />
          </>
          :
          <>
            <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ title:'betaTinkr'}} />
          </>
        }
        </Stack.Navigator>
      </NavigationContainer>
      }
    </>

  )
}

export default App;
