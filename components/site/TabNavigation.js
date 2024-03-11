import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrainingStackScreen from '../site/TrainingStackScreen';
import ActivityTemplateStackScreen from '../site/ActivityTemplateStackScreen';
import AccountStackScreen from '../site/AccountStackScreen';



const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({headerShown: false})}>
            <Tab.Screen name="Training Plans" component={TrainingStackScreen} />
            <Tab.Screen name="Activity Templates" component={ActivityTemplateStackScreen} />
            <Tab.Screen name="Profile" component={AccountStackScreen} />

        </Tab.Navigator>
    )
}

export default TabNavigation;
