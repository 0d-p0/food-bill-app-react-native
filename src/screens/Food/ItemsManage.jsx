import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useReducer} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UnitScreen from './UnitScreen';
import CategoryScreen from './CategoryScreen';
import colors from 'tailwindcss/colors';
import FoodScreen from './FoodScreen';
import foodInputReducers, {
  initialState,
} from '../../reducers/foodInputReducers';
import {changeIsEditing} from '../../actions/foodInputAction';

const Tab = createMaterialTopTabNavigator();

const ItemsManage = ({navigation}) => {
  const [inputState, inputDispatch] = useReducer(
    foodInputReducers,
    initialState,
  );

  return (
    <View className="bg-indigo-500 flex-1">
      <Text className="text-white text-xl p-4 text-center">Manage</Text>

      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={({route}) => ({
          tabBarPressColor: colors.indigo[500],
          tabBarActiveTintColor: colors.black,
          tabBarIndicatorStyle: {
            borderBottomWidth: 2,
            borderColor: colors.blue[400],
          },
          tabBarLabelStyle: {fontSize: 16, fontWeight: '500'},
          tabBarStyle: {
            backgroundColor: colors.slate[100],
            elevation: 0,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            //   borderBottomWidth: 2,
            //   borderBottomColor: colors.gray[400],
          },

          tabBarBounces: false,
          tabBarScrollEnabled: false,
        })}>
        <Tab.Screen
          name="food"
          component={FoodScreen}
          options={{tabBarLabel: 'Food'}}
        />
        <Tab.Screen
          name="category"
          component={CategoryScreen}
          options={{tabBarLabel: 'Category'}}
        />
        <Tab.Screen
          name="unit"
          component={UnitScreen}
          options={{tabBarLabel: 'Unit'}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default ItemsManage;

const styles = StyleSheet.create({});
