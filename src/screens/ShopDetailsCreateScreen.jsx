import React, {useReducer, useEffect, useContext} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import InputComp from '../Components/InputComp';
import colors from 'tailwindcss/colors';
import ButtonComp from '../Components/ButtonComp';
import {useToast} from 'react-native-toast-notifications';
import shopDetailsReducers, {
  initialState,
} from '../reducers/shopDetailsReducers';
import {
  setAddress,
  setGSTNumber,
  setPhoneNumber,
  setShopName,
} from '../actions/shopDetailsActions';
import ShopDetailsValidator from '../utils/validateInputField/validateShopDetailsField';
import {handleUpdateShopDetails} from '../api/api clints/handleShopDetails';
import {getData, storeObjectData} from '../utils/AsyncStorage/asyncOperation';
import {AppStore} from '../App Context/AppContext';
import {color} from '../res/colors';

const ShopDetailsCreateScreen = () => {
  const toast = useToast();
  const {setIsLogin, setLoading, setShopDetails} = useContext(AppStore);
  const [state, dispatch] = useReducer(shopDetailsReducers, initialState);

  const {
    shopName,
    phoneNumber,
    address,
    gstNumber,
    shopNameError,
    phoneNumberError,
    addressError,
    gstNumberError,
  } = state;

  useEffect(() => {
    toast.show('Please Fill your shop details', {
      type: 'warning',
    });
  }, []);

  const handleSubmit = async () => {
    if (ShopDetailsValidator(state, dispatch)) {
      return;
    }

    try {
      setLoading(true);
      const token = await getData('token');

      const response = await handleUpdateShopDetails(
        {
          shopName: shopName,
          shopAddress: address,
          shopNumber: phoneNumber,
          shopGST: gstNumber,
        },
        token,
      );

      if (!response.success) {
        setLoading(false);
        toast.show(response.message, {
          type: 'danger',
        });
        return;
      }

      const storeResponse = await storeObjectData(
        'shopDetails',
        response.message?.data,
      );

      if (storeResponse) {
        setShopDetails(response.message?.data);
        setIsLogin(true);
        setLoading(false);
      } else {
        toast.show('some error occur while store shop details', {
          type: 'danger',
          duration: 2000,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.hideAll();
      console.log(error);
      toast.show('some error occur', {
        type: 'danger',
      });
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className=" h-full"
      style={{backgroundColor: color.primary}}>
      <View className=" h-2/6 ">
        <Text className="p-5 font-bold text-2xl text-white">Shop Details</Text>
      </View>

      <View
        className=" h-screen rounded-2xl  p-5"
        style={{backgroundColor: color.background}}>
        <View className="absolute -top-40 left-[25%]">
          <Image
            source={require('../res/images/img_woman_1.png')}
            resizeMode="cover"
            className="h-48 w-48"
          />
        </View>

        <InputComp
          title={'Shop Name *'}
          errorText={shopNameError}
          placeholder={'Enter Shop Name'}
          value={shopName}
          onChangeText={value => dispatch(setShopName(value))}
        />

        <InputComp
          title={'Phone Number *'}
          errorText={phoneNumberError}
          placeholder={'Enter Shop Number'}
          value={phoneNumber}
          keyboardType="numeric"
          onChangeText={value => dispatch(setPhoneNumber(value))}
        />

        <InputComp
          title={'Address *'}
          errorText={addressError}
          placeholder={'Enter Password'}
          value={address}
          onChangeText={value => dispatch(setAddress(value))}
        />

        <InputComp
          title={'GST Number'}
          errorText={gstNumberError}
          placeholder={'Enter GST Number'}
          keyboardType="numeric"
          value={gstNumber}
          onChangeText={value => dispatch(setGSTNumber(value))}
        />
        <ButtonComp
          backgroundColor={color.primary}
          title={'Create'}
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default ShopDetailsCreateScreen;
