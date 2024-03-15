import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import React from 'react';
import {Icons} from '../res/icons/icons';
import colors from 'tailwindcss/colors';
import {digressQuantity, increaseQuantity} from '../actions/foodActions';

const iconSize = 30;
const OrderFoodComp = ({index, item, dispatch, itemQuantitys}) => {
  return (
    <View className="flex-row items-center">
      {/* food details */}
      <View className="flex-row flex-[7] ">
        <Text className="text-black text-base font-normal mr-1">
          {index + 1}. {item.name}
        </Text>
        <Text className="text-black text-base font-normal">
          ({item.quantity} * ₹{item.price})
        </Text>
      </View>
      {/* button */}
      <View className="flex-[3] items-center flex-row justify-between ">
        <TouchableOpacity
          style={({pressed}) => [
            {
              backgroundColor: pressed ? colors.blue[200] : colors.slate[100],
              borderRadius: 20,
            },
          ]}
          onPress={() => {
            Vibration.vibrate(50);
            dispatch(digressQuantity(item));
          }}>
          <Icons.removeIcon color={colors.black} size={iconSize} />
        </TouchableOpacity>
        <Text className="text-black text-lg font-medium">
          {itemQuantitys[item._id] || 0}
        </Text>
        <TouchableOpacity
          style={({pressed}) => [
            {
              backgroundColor: pressed ? colors.blue[200] : colors.slate[100],
              borderRadius: 20,
            },
          ]}
          onPress={() => {
            Vibration.vibrate(50);
            dispatch(increaseQuantity(item));
          }}>
          <Icons.addIcon color={colors.black} size={iconSize} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderFoodComp;

const styles = StyleSheet.create({});
