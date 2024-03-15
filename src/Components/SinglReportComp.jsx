import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icons} from '../res/icons/icons';
import colors from 'tailwindcss/colors';
[
  {
    _id: '65e9df8df3eeef2be0dca9a2',
    date: '3/7/2024',
    foodDetails: [[Object], [Object]],
    orderTime: '09:08 PM',
    totalPrice: 338,
  },
];
const SinglReportComp = ({item, onPress}) => {
  return (
    <View className="flex-row gap-1 justify-between py-1">
      <View className="flex-row items-center gap-x-2 flex-[10]">
        <Icons.newsPaperIcon color={colors.green[500]} size={25} />
        <Text className="text-black text-base ">1{item?.date}</Text>
        <Text className="text-black text-base">{item?.orderTime}</Text>
        <Text className="text-green-600 text-base font-medium">
          ₹{item?.totalPrice}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        className="bg-green-200 px-3 py-1 rounded-xl flex-[2]">
        <Text className="text-green-500 text-sm text-center ">Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SinglReportComp;

const styles = StyleSheet.create({});
