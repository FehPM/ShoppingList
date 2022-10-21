import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopList from './components/ShopList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ShopList"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ShopList" component={ShopList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
