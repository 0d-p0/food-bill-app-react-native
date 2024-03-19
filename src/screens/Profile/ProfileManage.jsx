import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import colors from 'tailwindcss/colors';

import ShopDetailsScreen from './ShopDetailsScreen';
import HelpLineScreen from './HelpLineScreen';
import {Icons} from '../../res/icons/icons';
import {removeItemValue} from '../../utils/AsyncStorage/asyncOperation';
import {AppStore} from '../../App Context/AppContext';
import {useToast} from 'react-native-toast-notifications';
import DeleteAlert from '../../Components/DeleteAlertComp';
import {color} from '../../res/colors';

const Tab = createMaterialTopTabNavigator();
const ProfileManage = () => {
  const {setIsLogin} = useContext(AppStore);
  const [isModalShow, setIsModalShow] = useState(false);
  const toast = useToast();
  return (
    <View style={{backgroundColor: color.primary, flex: 1}}>
      <View className="flex-row justify-center items-center">
        <Text className="text-white text-xl p-4 text-center">Manage</Text>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? colors.blue[200] : color.primary,
              borderRadius: 20,
              padding: 2,
              position: 'absolute',
              right: 10,
            },
          ]}
          onPress={() => {
            // Logout action
            setIsModalShow(true);
          }}>
          <Icons.logoutIcon color={colors.white} size={25} />
        </Pressable>
      </View>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={({route}) => ({
          tabBarPressColor: color.primary,
          tabBarActiveTintColor: colors.black,

          tabBarIndicatorStyle: {
            borderBottomWidth: 2,
            borderColor: color.primary,
          },
          tabBarLabelStyle: {fontSize: 16, fontWeight: '500'},
          tabBarStyle: {
            backgroundColor: color.background,
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
          name="shopDetails"
          component={ShopDetailsScreen}
          options={{tabBarLabel: 'Shop Details'}}
        />
        <Tab.Screen
          name="helpLine"
          component={HelpLineScreen}
          options={{tabBarLabel: 'HelpLine'}}
        />
      </Tab.Navigator>
      <DeleteAlert
        successText="Logout"
        isVisible={isModalShow}
        onCancel={() => setIsModalShow(false)}
        onDelete={async () => {
          const tokenResponse = await removeItemValue('token');
          const shopResponse = await removeItemValue('shopDetails');

          if (tokenResponse && shopResponse) {
            setIsLogin(false);
            toast.show('Logout Success', {
              type: 'success',
            });
            setIsModalShow(false);
            return;
          }

          toast.show('operation failed', {
            type: 'danger',
          });
          setIsModalShow(false);
        }}
      />
    </View>
  );
};

export default ProfileManage;

const styles = StyleSheet.create({});
