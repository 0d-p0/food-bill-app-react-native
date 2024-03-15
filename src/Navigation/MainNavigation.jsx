import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import colors from 'tailwindcss/colors';
import {AppStore} from '../App Context/AppContext';
import BottomNavigation from './BottomNavigation';
import ShopDetailsCreateScreen from '../screens/ShopDetailsCreateScreen';
import ListContext from '../App Context/ListsContext';
import OrderdetailsScreen from '../screens/OrderdetailsScreen';
import ReportDetailScreen from '../screens/Reports/ReportDetailScreen';

const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  const {isLogin} = useContext(AppStore);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isLogin ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="ShopDetailsBoarding"
              component={ShopDetailsCreateScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="MainHome" component={BottomNavigation} />
            <Stack.Screen name="orderDetails" component={OrderdetailsScreen} />
            <Stack.Screen name="reportDetails" component={ReportDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
