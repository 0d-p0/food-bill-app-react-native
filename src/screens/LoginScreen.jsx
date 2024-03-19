import React, {useContext, useReducer, useRef} from 'react';
import {
  Alert,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputComp from '../Components/InputComp';
import {Icons} from '../res/icons/icons';
import colors from 'tailwindcss/colors';
import ButtonComp from '../Components/ButtonComp';
import {AppStore} from '../App Context/AppContext';
import AnimatedMirrorImage from '../Components/Animation/AnimatedMirrorImage';
import authReducer, {initialState} from '../reducers/authReducer';

const iconSize = 25;
const iconColor = color.primary;

import {
  toggleRegister,
  togglePasswordVisibility,
  setEmail,
  setPassword,
  setEmailError,
  setPasswordError,
  setEmailFocus,
  setPasswordFocus,
} from '../actions/authActions';
import {
  handleLoginRequest,
  handleRegisterRequest,
} from '../api/api clints/handleAuth';
import {storeData, storeObjectData} from '../utils/AsyncStorage/asyncOperation';
import {useToast} from 'react-native-toast-notifications';
import {isEmpty} from '../utils/isEmpty';
import useInputRefs from '../hooks/useInputRefs';
import {color} from '../res/colors';

const LoginScreen = ({navigation}) => {
  const toast = useToast();
  const {setIsLogin, setLoading, setToken, setShopDetails} =
    useContext(AppStore);
  const [state, dispatch] = useReducer(authReducer, initialState);
  const {
    isRegister,
    isPasswordVisible,
    email,
    password,
    emailError,
    passwordError,
    isEmailFocused,
    isPasswordFocused,
  } = state;

  // Email validation function
  const validateEmail = email => {
    if (!email) {
      dispatch(setEmailError('Please enter your mail'));
      return true;
    }
    if (!email.includes('@')) {
      dispatch(setEmailError('Invalid email address'));
      return true;
    }
    dispatch(setEmailError('')); // Clear email error if email is valid
    return false;
  };

  // Password validation function
  const validatePassword = password => {
    if (!password) {
      dispatch(setPasswordError('Please enter your Password'));
      return true;
    }

    if (password.length < 6) {
      dispatch(
        setPasswordError('Password must be at least 6 characters long '),
      );
      return true;
    }
    dispatch(setPasswordError('')); // Clear password error if password is valid

    return false;
  };

  // Perform Login
  async function performLogin() {
    if (validateEmail(email) || validatePassword(password)) {
      return;
    }

    try {
      setLoading(true);
      const response = await handleLoginRequest({
        username: email,
        password: password,
      });

      if (!response.success) {
        setLoading(false);
        return toast.show(response.message.message, {
          type: 'danger',
        });

        Alert.alert('alert', response.message.message);
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

      if (tokenStoreResponse) {
        setToken(response?.message?.token);
        toast.show('login success', {
          type: 'success',
          duration: 2000,
        });
      }
      // Check shop details is available or not
      //  if not available  then navigate to shop Details Screen
      //  else  Navigate to Home Screen
      if (isEmpty(response.message?.data)) {
        navigation.navigate('ShopDetailsBoarding');
        setLoading(false);
        return;
      }

      // store Shop Details Response
      const shopDetailsResponse = await storeObjectData(
        'shopDetails',
        response.message?.data,
      );
      if (!shopDetailsResponse) {
        setLoading(false);
        return toast.show('some error occur while store shop details', {
          type: 'danger',
          duration: 2000,
        });
      }
      setShopDetails(response.message?.data);
      setLoading(false);
      setIsLogin(true);
    } catch (error) {
      setLoading(false);
      toast.hideAll();
      toast.show('some error occur', {
        type: 'danger',
      });
    }
  }

  // Perform Registration
  async function performRegister() {
    if (validateEmail(email) || validatePassword(password)) {
      return;
    }

    try {
      setLoading(true);
      const response = await handleRegisterRequest({
        username: email,
        password: password,
      });

      if (!response.success) {
        setLoading(false);
        return toast.show(response.message.message, {
          type: 'danger',
        });

        Alert.alert('alert', response.message.message);
      }

      if (response.success) {
        toast.show('Registration successfull', {
          type: 'success',
        });
        setLoading(false);
        dispatch(toggleRegister());
      }
    } catch (error) {
      setLoading(false);
      toast.hideAll();
      toast.show('some error occur', {
        type: 'danger',
      });
    }
  }

  const {inputRefs, focusNextInput} = useInputRefs(3); // Generate 10 input refs
  return (
    <View style={{backgroundColor: color.primary, flex: 1}}>
      {/* Title */}
      <View className="h-1/3">
        <Text className="p-5 font-bold text-xl text-white">WellC😀me</Text>
      </View>

      {/* Image */}
      <View
        className={` h-4/5 rounded-2xl p-5`}
        style={{backgroundColor: color.background}}>
        <View className="absolute -top-40 left-[25%]">
          <AnimatedMirrorImage mirror={isRegister}>
            <Image
              source={require('../res/images/img_woman_1.png')}
              resizeMode="cover"
              className="h-48 w-48"
            />
          </AnimatedMirrorImage>
        </View>

        {/* Email Component */}
        <InputComp
          title={'Email'}
          errorText={emailError}
          placeholder={'Enter Email'}
          value={email}
          onChangeText={text => {
            dispatch(setEmail(text));
          }}
          mainStyle={emailError && 'border-red-400 border-2'} // Apply error style if email error exists
        >
          <Icons.emailIcon size={iconSize} color={iconColor} />
        </InputComp>

        {/* Password Component */}
        <InputComp
          title={'Password'}
          errorText={passwordError}
          placeholder={'Enter Password'}
          value={password}
          onChangeText={text => {
            dispatch(setPassword(text));
            // validatePassword(text); // Validate password when it changes
          }}
          secureTextEntry={isPasswordVisible}
          mainStyle={passwordError && 'border-red-400 border-2'} // Apply error style if password error exists
        >
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? colors.blue[200] : colors.gray[200],
                borderRadius: 20,
              },
            ]}
            onPress={() => dispatch(togglePasswordVisibility())}>
            {isPasswordVisible ? (
              <Icons.eyeIcon color={iconColor} size={iconSize} />
            ) : (
              <Icons.eyeOffIcon color={iconColor} size={iconSize} />
            )}
          </Pressable>
        </InputComp>

        {/* Login / Register Button component */}
        <ButtonComp
          backgroundColor={color.primary}
          title={isRegister ? 'Register' : 'Login'}
          onPress={() => {
            if (isRegister) {
              performRegister();
            } else {
              performLogin();
            }
          }}
        />

        <TouchableOpacity
          onPress={() => {
            dispatch(toggleRegister());
          }}>
          <Text className="text-black text-right p-3">
            Want to {!isRegister ? 'Register' : 'Login'} Click!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
