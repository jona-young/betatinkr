import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/site/Home';
import TrainingPlan from './components/training/TrainingPlan';
import TrainingCycle from './components/training/TrainingCycle';
import TrainingWeek from './components/training/TrainingWeek';
import TrainingDay from './components/training/TrainingDay';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title:'Overview'}} />
        <Stack.Screen name="TrainingPlan" component={TrainingPlan} options={{ title:'Training Plan'}} />
        <Stack.Screen name="TrainingCycle" component={TrainingCycle} options={{ title:'Training Cycle'}} />
        <Stack.Screen name="TrainingWeek" component={TrainingWeek} options={{ title:'Training Week'}} />
        <Stack.Screen name="TrainingDay" component={TrainingDay} options={{ title:'Training Day'}} />
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}



export default App;
