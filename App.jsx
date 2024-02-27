import React, { useCallback, useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/site/Home';
import Loading from './components/site/Loading'
import Signup from './components/site/Signup'
import ForgotPassword from './components/site/ForgotPassword'
import ResetPassword from './components/site/ResetPassword'
import TrainingPlans from './components/training/TrainingPlans';
import TrainingPlan from './components/training/TrainingPlan';
import TrainingCycle from './components/training/TrainingCycle';
import TrainingWeek from './components/training/TrainingWeek';
import TrainingDay from './components/training/TrainingDay';
import FormTrainingPlan from './components/training/FormTrainingPlan';
import FormCycleWorkouts from './components/training/FormCycleWorkouts';
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
  }, [authContext.authData.accessToken])

  useEffect(() => {
      loadJWT(setStatus)
  },[loadJWT])

  if (status == 'loading')
  {
    <Loading />
  } else if (authenticated == false) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} options={{ title:'BetaTinkr'}} />
              <Stack.Screen name="Signup" component={Signup} options={{ title:'BetaTinkr'}} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title:'BetaTinkr'}} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title:'BetaTinkr'}} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TrainingPlans">
              <Stack.Screen name="TrainingPlans" component={TrainingPlans} options={{ title:'Training Plans'}} />
              <Stack.Screen name="TrainingPlan" component={TrainingPlan} options={{ title:'Training Plan'}} />
              <Stack.Screen name="TrainingCycle" component={TrainingCycle} options={{ title:'Training Cycle'}} />
              <Stack.Screen name="TrainingWeek" component={TrainingWeek} options={{ title:'Training Week'}} />
              <Stack.Screen name="TrainingDay" component={TrainingDay} options={{ title:'Training Day'}} />
              <Stack.Screen name="TrainingPlan-Form" component={FormTrainingPlan} options={{ title:'New Plan'}} />
              <Stack.Screen name="CycleWorkout-Form" component={FormCycleWorkouts} options={{ title:'Setup Workout'}} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}



export default App;
