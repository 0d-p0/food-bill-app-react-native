import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListContext from '../App Context/ListsContext';
import BottomNavigation from './BottomNavigation';
import OrderdetailsScreen from '../screens/OrderdetailsScreen';

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <ListContext>
      <Stack.Screen name="MainHome" component={BottomNavigation} />
      <Stack.Screen name="orderDetails" component={OrderdetailsScreen} />
    </ListContext>
  );
};

export default AuthNavigation;
