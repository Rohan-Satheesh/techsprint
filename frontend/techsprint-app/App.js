import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import ReportForm from './screens/ReportForm';
import AssistanceRequest from './screens/AssistanceRequest';
import RouteSafety from './screens/RouteSafety';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:true}}>
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Report" component={ReportForm} />
        <Stack.Screen name="Assistance" component={AssistanceRequest} />
        <Stack.Screen name="Routes" component={RouteSafety} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
