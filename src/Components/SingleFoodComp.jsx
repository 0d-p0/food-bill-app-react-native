import {View, Text, Pressable, Vibration, TouchableOpacity} from 'react-native';
import React from 'react';
import {Icons} from '../res/icons/icons';
import colors from 'tailwindcss/colors';
import {digressQuantity, increaseQuantity} from '../actions/foodActions';
import {color} from '../res/colors';

const SingleFoodComp = ({item, dispatch, itemQuantitys}) => {
  return (
    <View className="border-gray-500 border-[1px] rounded-xl  divide-x  divide-gray-500 flex-row justify-between my-2">
      <View className="flex-1 px-5 py-2">
        {/* Food Name  */}
        <Text className="text-black text-xl tracking-wider capitalize">
          {item?.name}
        </Text>
        {/* Food Price  */}
        <Text className="text-green-700 text-lg font-medium tracking-wider">
          ₹{item?.price}
        </Text>
      </View>

      <View className="flex-1 items-center flex-row justify-between px-4">
        <TouchableOpacity
          style={{
            elevation: 20,
          }}
          onPress={() => {
            Vibration.vibrate(50);
            dispatch(digressQuantity(item));
          }}>
          <Icons.removeIcon color={color.primary} size={45} />
        </TouchableOpacity>
        <Text className="text-black text-xl font-medium">
          {itemQuantitys[item._id] || 0}
        </Text>
        <TouchableOpacity
          style={{
            elevation: 20,
          }}
          onPress={() => {
            Vibration.vibrate(50);
            dispatch(increaseQuantity(item));
          }}>
          <Icons.addIcon color={color.primary} size={45} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleFoodComp;
