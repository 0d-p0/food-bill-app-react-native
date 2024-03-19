import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ItemsManage from '../screens/Food/ItemsManage';
import colors from 'tailwindcss/colors';
import {Icons} from '../res/icons/icons';
import ProfileManage from '../screens/Profile/ProfileManage';
import ListContext from '../App Context/ListsContext';
import ReportScreen from '../screens/Reports/ReportScreen';
import SettingScreen from '../screens/Settings/SettingScreen';
import {color} from '../res/colors';

const Tab = createBottomTabNavigator();

const iconSize = 30;
const BottomNavigation = () => {
  return (
    <ListContext>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            display: 'flex',

            ...styles.tabBarStyle,
          },
          tabBarInactiveTintColor: colors.gray[500],

          tabBarActiveTintColor: '#ffff',
        })}

        // initialRouteName="WishList"
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <View style={styles.activeButton}>
                  <Icons.homeOutLineIcon color={color} size={iconSize} />
                </View>
              ) : (
                <Icons.homeOutLineIcon color={color} size={iconSize} />
              ),
          }}
        />
        <Tab.Screen
          name="ItemsManage"
          component={ItemsManage}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <View style={styles.activeButton}>
                  <Icons.foodOutLineIcon color={color} size={iconSize} />
                </View>
              ) : (
                <Icons.foodOutLineIcon color={color} size={iconSize} />
              ),
          }}
        />

        <Tab.Screen
          name="Reports"
          component={ReportScreen}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <View style={styles.activeButton}>
                  <Icons.flagOutLineIcon color={color} size={iconSize} />
                </View>
              ) : (
                <Icons.flagOutLineIcon color={color} size={iconSize} />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileManage}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <View style={styles.activeButton}>
                  <Icons.ProfileIcon color={color} size={iconSize} />
                </View>
              ) : (
                <Icons.ProfileIcon color={color} size={iconSize} />
              ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <View style={styles.activeButton}>
                  <Icons.settingsOutlineIcon color={color} size={iconSize} />
                </View>
              ) : (
                <Icons.settingsOutlineIcon color={color} size={iconSize} />
              ),
          }}
        />
      </Tab.Navigator>
    </ListContext>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  tabBarStyle: {
    elevation: 0,
    borderTopWidth: 0,
    backgroundColor: color.background,
  },
  activeButton: {
    backgroundColor: color.primary,
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
  },
});
