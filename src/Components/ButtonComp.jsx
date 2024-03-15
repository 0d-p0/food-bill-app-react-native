import {Pressable, StyleSheet, Text, View} from 'react-native';
import colors from 'tailwindcss/colors';
import React from 'react';
import {getLighterShade} from '../utils/Color/getLighterShade';

const ButtonComp = ({
  title,
  onLongPress,
  backgroundColor,
  onPress,
  containerStyle,
  textClassName,
  disabled = false,
}) => {
  const lighterShade = getLighterShade(backgroundColor);
  return (
    <Pressable
      disabled={disabled}
      // className="bg-blue-600 mt-5 items-center rounded-xl"
      style={({pressed}) => [
        {
          backgroundColor: pressed ? lighterShade : backgroundColor,
          borderRadius: 10,
          marginTop: 20,
          alignItems: 'center',
          elevation: 5,
          ...containerStyle,
        },
      ]}
      onLongPress={onLongPress}
      onPress={onPress}>
      <Text className={`p-2 font-bold text-xl text-white ${textClassName}`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({});
