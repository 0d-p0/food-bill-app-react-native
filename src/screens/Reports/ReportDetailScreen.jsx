import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SpcaerComp from '../../Components/SpcaerComp';
import colors from 'tailwindcss/colors';
import {Icons} from '../../res/icons/icons';
import ButtonComp from '../../Components/ButtonComp';

// [
//   {
//     _id: '65e9dffff3eeef2be0dca9b2',
//     date: '3/7/2024',
//     orderTime: '09:10 PM',
//     totalPrice: 393,
//     foodDetails: [
//       {foodName: 'Biriyani', price: 96, quantity: 3},
//       {foodName: 'Vat change', price: 25, quantity: 3},
//       {foodName: 'rosgolla', price: 10, quantity: 3},
//     ],
//   },
// ];
const ReportDetailScreen = ({route, navigation}) => {
  const {details} = route.params;
  return (
    <View className="bg-indigo-500 flex-1">
      <View className="flex-row items-center">
        {/* Back icon */}
        <TouchableOpacity
          className="flex-row px-2"
          onPress={() => {
            navigation.goBack();
          }}>
          <Icons.backIcon color={colors.white} size={25} />
          {/* <Text className="text-base text-white font-normal px-1">Back</Text> */}
        </TouchableOpacity>
        <Text className="text-white text-xl p-4 text-center  w-9/12 ">
          Report Details
        </Text>
      </View>

      <View className="bg-white flex-1 rounded-t-3xl p-5">
        {/* Total Amount */}
        <View className="border-gray-400 border-2 rounded-2xl p-2">
          <Text className="text-black text-base font-normal">Amount</Text>
          <Text className="text-black text-2xl font-normal tracking-wider">
            ₹{details?.totalPrice}
          </Text>
        </View>
        {/* Date and Time */}
        <SpcaerComp height={10} />
        <View className="border-gray-400 border-2 rounded-2xl p-2">
          <Text className="text-black text-base font-normal">
            Date: {details?.date}
          </Text>
          <Text className="text-black text-base font-normal">
            Time: {details?.orderTime}
          </Text>
        </View>

        {/* Food List */}
        <SpcaerComp height={10} />
        <ScrollView>
          <View className="border-gray-400 border-2 rounded-2xl p-2">
            <Text className="text-black text-base font-normal">Food List</Text>

            {details &&
              details?.foodDetails &&
              details?.foodDetails.map((props, index) => (
                <View className="flex-row" key={index}>
                  <Text className="text-black text-base font-normal mr-1">
                    {props?.foodName}
                  </Text>
                  <Text className="text-black text-base font-normal">
                    ({props?.quantity} * ₹{props?.price}) = ₹
                    {props?.quantity * props?.price}
                  </Text>
                </View>
              ))}

            <View className="mt-1  flex-row justify-between items-center">
              <Text className="text-black font-medium text-xl">Total</Text>
              <View className="w-5/6  border-0 h-px bg-gray-700 border-dashed	" />
            </View>
            <Text className="text-green-500 text-base font-medium text-right  tracking-wider">
              ₹{details?.totalPrice}
            </Text>
          </View>
        </ScrollView>

        <ButtonComp backgroundColor={colors.violet[400]} title={'Print'} />
      </View>
    </View>
  );
};

export default ReportDetailScreen;

const styles = StyleSheet.create({});
