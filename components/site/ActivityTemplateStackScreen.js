import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActivityTemplates from '../training/ActivityTemplates';
import ActivityTemplate from '../training/ActivityTemplate';
import FormActivityTemplate from '../training/FormActivityTemplate';

const ActivityTemplateStack = createNativeStackNavigator();
const ActivityTemplateStackScreen = () => {
  return (
    <ActivityTemplateStack.Navigator screenOptions={{ headerShown: false}}>
      <ActivityTemplateStack.Screen name="ActivityTemplates" component={ActivityTemplates} options={{ title:'Activity Templates'}} />
      <ActivityTemplateStack.Screen name="ActivityTemplate" component={ActivityTemplate} options={{ title:'Activity Template'}} />
      <ActivityTemplateStack.Screen name="ActivityTemplate-Form" component={FormActivityTemplate} options={{ title:'New Section Template'}} />
    </ActivityTemplateStack.Navigator>
  )
}

export default ActivityTemplateStackScreen;