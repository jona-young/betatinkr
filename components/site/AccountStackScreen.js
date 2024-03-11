import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../site/Profile';

const AccountStack = createNativeStackNavigator();
const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false}}>
      <AccountStack.Screen name="Profile" component={Profile} options={{ title:'Profile'}} />
    </AccountStack.Navigator>
  )
}

export default AccountStackScreen;