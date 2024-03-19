import {ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {AppStore} from '../../App Context/AppContext';
import PressableComp from '../../Components/PressableComp';
import colors from 'tailwindcss/colors';
import {Icons} from '../../res/icons/icons';
import SettingComp from '../../Components/SettingComp';
import DeleteAlert from '../../Components/DeleteAlertComp';
import PasswordChangeModal from './PasswordChange';
import {Toast, useToast} from 'react-native-toast-notifications';
import {
  handleChangePasswordRequest,
  handleLogoutOtherRequest,
} from '../../api/api clints/handleAuth';
import {storeData} from '../../utils/AsyncStorage/asyncOperation';
import {color} from '../../res/colors';

const iconColor = colors.black;
const iconSize = 25;

const SettingScreen = ({navigation}) => {
  const toast = useToast();
  const {token, setLoading, sessionOutReq, setToken} = useContext(AppStore);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPasswordChangeShow, setIsPasswordChangeShow] = useState(false);
  const [logoutOthersShow, setLogoutOtherShow] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  async function performPasswordChange(oldPassword, newPassword) {
    if (!oldPassword || !newPassword) {
      Toast.show('Please fill in all fields.', {
        type: 'warning',
      });
      return;
    }
    try {
      setLoading(true);
      const response = await handleChangePasswordRequest(token, {
        password: oldPassword,
        newPassword: newPassword,
      });

      if (!response.success) {
        setLoading(false);
        if (response?.status == 401) {
          return sessionOutReq();
        }
        return toast.show(response.message.message, {type: 'warning'});
      }

      // token store operation success
      const tokenStoreResponse = await storeData(
        'token',
        response?.message?.token,
      );
      if (!tokenStoreResponse) {
        setLoading(false);
        return toast.show('some error occur while login', {
          type: 'danger',
          duration: 2000,
        });
      }
      setToken(response?.message?.token);
      toast.show('Password Change successfully', {
        type: 'success',
      });
      setLoading(false);
      setIsPasswordChangeShow(false);
    } catch (error) {
      setLoading(false);
      setIsPasswordChangeShow(false);
      toast.show('some error occur', {
        type: 'warning',
      });
    }
  }

  async function performLogoutOthers() {
    try {
      setLoading(true);
      const response = await handleLogoutOtherRequest(token);

      if (!response.success) {
        setLoading(false);
        if (response?.status == 401) {
          return sessionOutReq();
        }
        return toast.show(response.message, {type: 'warning'});
      }

      // token store operation success
      const tokenStoreResponse = await storeData(
        'token',
        response?.message?.token,
      );
      if (!tokenStoreResponse) {
        setLoading(false);
        return toast.show('some error occur while login', {
          type: 'danger',
          duration: 2000,
        });
      }
      setToken(response?.message?.token);
      toast.show(response.message.message, {
        type: 'success',
      });
      setLoading(false);
      setLogoutOtherShow(false);
    } catch (error) {
      setLoading(false);
      setLogoutOtherShow(false);
      toast.show('some error occur', {
        type: 'warning',
      });
    }
  }
  return (
    <View style={{backgroundColor: color.primary, flex: 1}}>
      <Text className="text-white text-xl p-4 text-center">Setting</Text>
      <View
        className="bg-slate-100 flex-1 rounded-t-3xl p-5"
        style={{backgroundColor: color.background}}>
        <ScrollView>
          {/* password change  */}
          <SettingComp
            onPress={() => {
              setIsPasswordChangeShow(true);
            }}
            disabled={false}
            leftIcon={<Icons.passwordIcon color={iconColor} size={iconSize} />}
            title={'Password Change'}>
            <Icons.arrowRightIcon color={iconColor} size={iconSize} />
          </SettingComp>
          {/* Logout From Other Devices  */}
          <SettingComp
            onPress={() => setLogoutOtherShow(true)}
            disabled={false}
            leftIcon={<Icons.logoutIcon color={iconColor} size={iconSize} />}
            title={'Logout others'}>
            <Icons.arrowRightIcon color={iconColor} size={iconSize} />
          </SettingComp>
          {/* THEME TOOGLE */}
          <SettingComp
            onPress={() => {}}
            leftIcon={<Icons.paintIcon color={iconColor} size={iconSize} />}
            title={'Theme Change'}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </SettingComp>
          {/* OFFLINE USED TOOGLE */}
          <SettingComp
            onPress={() => {}}
            leftIcon={<Icons.offlineIcon color={iconColor} size={iconSize} />}
            title={'Offline Mode'}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </SettingComp>
        </ScrollView>
      </View>

      <PasswordChangeModal
        isVisible={isPasswordChangeShow}
        onClose={() => setIsPasswordChangeShow(false)}
        onSubmit={(oldPassword, newPassword) =>
          performPasswordChange(oldPassword, newPassword)
        }
      />
      <DeleteAlert
        successText="Action"
        isVisible={logoutOthersShow}
        onCancel={() => {
          setLogoutOtherShow(false);
        }}
        onDelete={performLogoutOthers}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default SettingScreen;
