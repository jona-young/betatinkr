import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrainingPlans from '../training/TrainingPlans';
import TrainingPlan from '../training/TrainingPlan';
import TrainingCycle from '../training/TrainingCycle';
import TrainingWeek from '../training/TrainingWeek';
import TrainingDay from '../training/TrainingDay';
import FormTrainingPlan from '../training/FormTrainingPlan';
import FormCycleWorkouts from '../training/FormCycleWorkouts';

const TrainingStack = createNativeStackNavigator();
const TrainingStackScreen = () => {
  return (
    <TrainingStack.Navigator screenOptions={{ headerShown: false}}>
      <TrainingStack.Screen name="TrainingPlans" component={TrainingPlans} options={{ title:'Training Plans'}} />
      <TrainingStack.Screen name="TrainingPlan" component={TrainingPlan} options={{ title:'Training Plan'}} />
      <TrainingStack.Screen name="TrainingCycle" component={TrainingCycle} options={{ title:'Training Cycle'}} />
      <TrainingStack.Screen name="TrainingWeek" component={TrainingWeek} options={{ title:'Training Week'}} />
      <TrainingStack.Screen name="TrainingDay" component={TrainingDay} options={{ title:'Training Day'}} />
      <TrainingStack.Screen name="TrainingPlan-Form" component={FormTrainingPlan} options={{ title:'New Plan'}} />
      <TrainingStack.Screen name="CycleWorkout-Form" component={FormCycleWorkouts} options={{ title:'Setup Workout'}} />
    </TrainingStack.Navigator>
  )
}

export default TrainingStackScreen;