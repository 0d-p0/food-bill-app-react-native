import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {Icons} from '../res/icons/icons';
import SpcaerComp from '../Components/SpcaerComp';
import colors from 'tailwindcss/colors';
import OrderFoodComp from '../Components/OrderFoodComp';
import ButtonComp from '../Components/ButtonComp';
import foodReducers, {initialState} from '../reducers/foodReducers';
import {AppStore} from '../App Context/AppContext';
import {clearOrderList, handleDiscount} from '../actions/foodActions';
import {handleCreateBill} from '../api/api clints/handleBill';
import {Toast} from 'react-native-toast-notifications';
import InputComp from '../Components/InputComp';
import {color} from '../res/colors';
import ThermalPrinterModule from 'react-native-thermal-printer';
import calculateGST from '../utils/gst/calculateTotalGst';
import {isEmpty} from '../utils/isEmpty';

const OrderdetailsScreen = ({navigation, route}) => {
  // const {total, orderList, test, setTest} = route.params;
  const {foodState, foodDispatch, token, setLoading, shopDetails} =
    useContext(AppStore);

  const {total, orderList, itemQuantitys} = foodState;
  let printbill = '';

  const memoizedResult = useMemo(() => {
    return calculateGST(orderList);
  }, [total, orderList]);

  const {gstTotal, gstData} = memoizedResult;
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
      // navigation.goBack();
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
  useEffect(() => {
    foodDispatch(handleDiscount(0));
  }, []);

  function printFirstWordAndReturnLastWord(text) {
    console.log('name = ' + text);
    console.log('length = ' + text.length);
    var words = text.split(' ');
    var firstWords = '';

    console.log('words length = ' + words.length);
    console.log('words data  = ' + words);
    if (text.length <= 8) {
      console.log('is word length less than 8');
      return text;
    }

    if (words.length > 0) {
      for (var i = 0; i < words.length; i++) {
        if (i < words.length - 1) {
          // printer(words[i]);
          printbill += `[L]<b>${words[i]}</b>\n`;
          console.log('print ' + words[i]);
        }
      }
      // Return the last word.
      return words[words.length - 1];
    }

    // Return an empty string if there are no words in the input text.
    return '';
  }
  const generateBill = () => {
    if (shopDetails?.name) {
      printbill += `[C]<u><font size='tall'>${shopDetails?.name}</font></u>\n`;
    }
    // printbill += `[C]<u>${shopDetails?.name}</u>\n`;
    (printbill +=
      '[L]-------------------------------\n' +
      '[L]<b>Item</b>[C]<b>Qty</b>[C]<b>Price</b>[C]<b>Total</b>\n'),
      orderList.forEach(item => {
        if (item.name.length >= 8) {
          const itName = printFirstWordAndReturnLastWord(item.name);
          printbill += `[L]<b>${itName}</b>[C]<b>${item.quantity}</b>[C]<b>${
            item.price
          }</b>[C]<b>${item.quantity * item.price}</b>\n`;
        } else {
          printbill += `[L]<b>${item.name}</b>[C]<b>${item.quantity}</b>[C]<b>${
            item.price
          }</b>[C]<b>${item.quantity * item.price}</b>\n`;
        }
      });
    printbill +=
      '[L]-------------------------------\n' +
      '[L]<b>Item</b>[C]<b>Qty</b>[C]<b>Percent</b>[C]<b>Total</b>\n';
    gstData.forEach(item => {
      printbill += `[L]<b>${item.type}</b>[C]<b>${item.quantity}</b>[C]<b>${item.percent}</b>[C]<b>${item.total}</b>\n`;
    });
    printbill += '[L]-------------------------------\n';
    printbill += `[L]Grand Total [R]${total.totalPrice + gstTotal}${''.padEnd(
      2,
    )}\n\n`;
    printbill += `[C]THANK YOU VISIT AGAIN\n`;
    printbill += '[L]\n' + '[L]\n' + '[L]\n' + '[L]\n';
    return printbill;
  };

  const startPrint = async printText => {
    // inside async function
    try {
      await ThermalPrinterModule.printBluetooth({
        payload: printText,
        printerNbrCharactersPerLine: 32,
        printerWidthMM: 55,
        // printerDpi: 420,
      });
    } catch (err) {
      //error handling
      console.log(err.message);
    }
  };

  return (
    <View style={{backgroundColor: color.background, flex: 1}}>
      <View className="flex-[10] ">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            className="h-[35%] rounded-b-3xl "
            style={{backgroundColor: color.primary}}>
            {/* Back icon */}
            <TouchableOpacity
              className="flex-row px-2"
              onPress={() => {
                navigation.goBack();
              }}>
              <Icons.backIcon color={colors.white} size={25} />
              <Text className="text-base text-white font-normal px-1">
                Back
              </Text>
            </TouchableOpacity>
            {/* Price */}
            <View className="items-center justify-center h-2/5">
              <Text className="text-white text-3xl font-medium tracking-widest">
                ₹
                {(parseFloat(total.totalPrice) + parseFloat(gstTotal)).toFixed(
                  2,
                )}
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
          <SpcaerComp height={70} />
          {/* order lists */}
          <View className="flex-[12] px-6">
            {/* title  */}
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

            {!isEmpty(gstData) && (
              <View className="mt-2  flex-row justify-between items-center gap-x-2">
                <View className="w-[30%]  border-0 h-px bg-gray-700 border-dashed	" />

                <Text className="text-black font-medium text-xl">
                  GST Details
                </Text>
                <View className="w-[30%] border-0 h-px bg-gray-700 border-dashed	" />
              </View>
            )}

            {/*   [{"gstTotal": "98.4", "percent": "5.00%", "quantity": "16", "type": "CGST"}, {"gstTotal": "98.4", "percent": "5.00%", "quantity": "16", "type": "SGST"}] */}
            {!isEmpty(gstData) && (
              <View className="flex-row justify-between">
                <Text className="text-black text-base font-normal mr-1 flex-1">
                  Type
                </Text>
                <Text className="text-black text-base font-normal mr-1 flex-1 ">
                  Qty
                </Text>
                <Text className="text-black text-base font-normal mr-1 flex-1">
                  Percent
                </Text>
                <Text className="text-black text-base font-normal mr-1 flex-1 text-right">
                  Total
                </Text>
              </View>
            )}

            {!isEmpty(gstData) &&
              gstData.map((props, index) => (
                <View
                  key={index}
                  className="flex-row justify-between text-center">
                  <Text className="text-black text-base font-normal mr-1 flex-1 ml-1">
                    {index + 1}. {props.type}
                  </Text>
                  <Text className="text-black text-base font-normal mr-1 flex-1 ">
                    {props.quantity}
                  </Text>
                  <Text className="text-black text-base font-normal mr-1 flex-1">
                    {props.percent}
                  </Text>
                  <Text className="text-green-600 text-base font-normal mr-1 flex-1 text-right">
                    ₹{props.total}
                  </Text>
                </View>
              ))}
            <View className="mt-2  flex-row justify-between items-center">
              <Text className="text-black font-medium text-xl">Total</Text>
              <View className="w-5/6  border-0 h-px bg-gray-700 border-dashed	" />
            </View>
            <Text
              className={`text-green-500 text-base font-medium text-right -my-2 tracking-wider`}>
              ₹
              {(parseFloat(total.totalPrice) + parseFloat(gstTotal)).toFixed(2)}
            </Text>

            <SpcaerComp height={20} />
          </View>
        </ScrollView>
      </View>

      <View className="px-6">
        {/* Bottom Part */}
        <InputComp
          placeholder={'Enter Dicount Percent'}
          onChangeText={value => {
            if (value < 0) {
              foodDispatch(handleDiscount(0));
            }
            foodDispatch(handleDiscount(value));
          }}
          topClass="-mb-3"
          keyboardType={'number-pad'}
        />
        <View className="pb-3 flex-row justify-between items-center">
          {/* Save Buuton */}
          <ButtonComp
            backgroundColor={color.green}
            title={'Save'}
            containerStyle={{width: '48%'}}
            onPress={performCreateBill}
          />
          {/* Print Button */}
          <ButtonComp
            onPress={() => {
              console.log(generateBill());
              // startPrint(generateBill());
            }}
            backgroundColor={color.primary}
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
