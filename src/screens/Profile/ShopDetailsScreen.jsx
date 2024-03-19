import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useReducer} from 'react';
import InputComp from '../../Components/InputComp';
import colors from 'tailwindcss/colors';
import ButtonComp from '../../Components/ButtonComp';
import {useToast} from 'react-native-toast-notifications';
import {AppStore} from '../../App Context/AppContext';
import shopDetailsReducers, {
  initialState,
} from '../../reducers/shopDetailsReducers';
import ShopDetailsValidator from '../../utils/validateInputField/validateShopDetailsField';
import {handleUpdateShopDetails} from '../../api/api clints/handleShopDetails';
import {
  removeItemValue,
  storeObjectData,
} from '../../utils/AsyncStorage/asyncOperation';
import {isEmpty} from '../../utils/isEmpty';
import {
  setAddress,
  setFullDetails,
  setGSTNumber,
  setPhoneNumber,
  setShopName,
} from '../../actions/shopDetailsActions';
import {color} from '../../res/colors';

const ShopDetailsScreen = () => {
  const toast = useToast();
  const {setLoading, token, shopDetails, setShopDetails, sessionOutReq} =
    useContext(AppStore);
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
    if (isEmpty(shopDetails)) {
      return;
    }
    //   {"GST": "9996589", "address": "gudheuiehevekk", "name": "pritam store change", "number": "98653488"}
    dispatch(setFullDetails(shopDetails));
  }, [shopDetails]);

  const handleSubmit = async () => {
    if (ShopDetailsValidator(state, dispatch)) {
      return;
    }

    try {
      setLoading(true);

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
        if (response.status == 401) {
          return sessionOutReq();
        }

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
        setLoading(false);
        toast.show(response.message?.message, {
          type: 'success',
        });
      } else {
        setLoading(false);
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
    <ScrollView className="p-5" style={{backgroundColor: color.background}}>
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
        title={'SAVE'}
        onPress={handleSubmit}
      />
    </ScrollView>
  );
};

export default ShopDetailsScreen;

const styles = StyleSheet.create({});
