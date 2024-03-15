import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {Icons} from '../res/icons/icons';
import colors from 'tailwindcss/colors';
const iconSize = 30;
const ItemActionComp = ({item, ondelete, onEdit}) => {
  return (
    <View className="border-gray-300 border-2 rounded-xl  divide-x  divide-gray-300 flex-row justify-between my-1 p-2 items-center">
      <Text className="text-black font-normal text-lg flex-[8] text-center capitalize">
        {item?.name}
      </Text>
      <TouchableOpacity className="flex-[2] items-center" onPress={ondelete}>
        <Icons.deleteIcon color={colors.red[500]} size={iconSize} />
      </TouchableOpacity>

      <TouchableOpacity className="flex-[2] items-center  " onPress={onEdit}>
        <Icons.editIcon color={colors.green[500]} size={iconSize} />
      </TouchableOpacity>
    </View>
  );
};

export default ItemActionComp;
