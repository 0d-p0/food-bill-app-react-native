import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import React, {useContext, useEffect, useReducer} from 'react';
import {Icons} from '../res/icons/icons';
import SpcaerComp from '../Components/SpcaerComp';
import colors from 'tailwindcss/colors';
import OrderFoodComp from '../Components/OrderFoodComp';
import ButtonComp from '../Components/ButtonComp';
import foodReducers, {initialState} from '../reducers/foodReducers';
import {AppStore} from '../App Context/AppContext';
import {clearOrderList} from '../actions/foodActions';
import {handleCreateBill} from '../api/api clints/handleBill';
import {Toast} from 'react-native-toast-notifications';
const iconSize = 30;
const OrderdetailsScreen = ({navigation, route}) => {
  // const {total, orderList, test, setTest} = route.params;
  const {foodState, foodDispatch, token, setLoading} = useContext(AppStore);

  const {total, orderList, itemQuantitys} = foodState;

  async function performCreateBill() {
    // actualPrice,
    // totalPrice,
    // GSTPrice,
    // foodList,
    // grandTotal,
    // totalDiscount,
    try {
      setLoading(true);
      const response = await handleCreateBill(token, {
        actualPrice: total.totalPrice,
        totalPrice: total.totalPrice,
        GSTPrice: 0,
        foodList: orderList,
        grandTotal: total.totalPrice,
        totalDiscount: 0,
      });

      if (!response.success) {
        setLoading(false);
        if (response.status == 401) {
          return sessionOutReq();
        }
        Toast.show(response.message, {type: 'danger'});
        return;
      }

      Toast.show(response.message.message, {type: 'success'});
      foodDispatch(clearOrderList());
      navigation.goBack();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (orderList.length == 0) {
      navigation.goBack();
    }
  }, [orderList]);

  return (
    <View className="bg-slate-100 flex-1 ">
      <View className="flex-[3] bg-indigo-500 rounded-b-3xl ">
        {/* Back icon */}
        <TouchableOpacity
          className="flex-row px-2"
          onPress={() => {
            navigation.goBack();
          }}>
          <Icons.backIcon color={colors.white} size={25} />
          <Text className="text-base text-white font-normal px-1">Back</Text>
        </TouchableOpacity>
        {/* Price */}
        <View className="items-center justify-center h-2/5">
          <Text className="text-white text-3xl font-medium tracking-widest">
            ₹{total?.totalPrice.toFixed(2)}
          </Text>
          <Text className="text-white text-2xl font-medium tracking-widest">
            Total
          </Text>
        </View>
        {/* right icon */}
        <View className="h-36 w-36 bg-white items-center justify-center rounded-full self-center shadow-md shadow-black mt-2">
          <View className="h-28 w-28 bg-green-500 items-center justify-center rounded-full">
            <Icons.doneIcon size={80} color={'white'} />
          </View>
        </View>
      </View>
      <SpcaerComp height={60} />
      <View className="flex-[7] px-6">
        {/* Top Part */}
        <View className="flex-[10] ">
          {/* title  */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* title */}
            <View className="flex-row justify-between">
              <Text className="text-black text-xl font-semibold">
                Order Summery
              </Text>
              <TouchableOpacity
                onPress={() => {
                  foodDispatch(clearOrderList());
                  navigation.goBack();
                }}
                className="flex-row items-center">
                <View className="mt-1">
                  <Icons.refreshIcon size={20} color={colors.red[500]} />
                </View>
                <Text className="text-red-500 text-lg font-semibold px-1">
                  clear
                </Text>
              </TouchableOpacity>
            </View>
            {/* Food List */}
            <View className="h-px my-4 border-0 bg-gray-700" />
            {orderList &&
              orderList.map((props, index) => (
                <OrderFoodComp
                  key={index}
                  index={index}
                  item={props}
                  dispatch={foodDispatch}
                  itemQuantitys={itemQuantitys}
                />
              ))}
            <View className="mt-2  flex-row justify-between items-center">
              <Text className="text-black font-medium text-xl">Total</Text>
              <View className="w-5/6  border-0 h-px bg-gray-700 border-dashed	" />
            </View>

            <Text className="text-green-500 text-base font-medium text-right -my-2 tracking-wider">
              ₹{total.totalPrice.toFixed(2)}
            </Text>
            <SpcaerComp height={20} />
          </ScrollView>
        </View>
        {/* Bottom Part */}
        <View className="pb-3 flex-row justify-between items-center">
          {/* Save Buuton */}
          <ButtonComp
            backgroundColor={colors.green[500]}
            title={'Save'}
            containerStyle={{width: '48%'}}
            onPress={performCreateBill}
          />
          {/* Print Button */}
          <ButtonComp
            backgroundColor={colors.indigo[500]}
            title={'Print'}
            containerStyle={{width: '48%'}}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderdetailsScreen;

const styles = StyleSheet.create({});
