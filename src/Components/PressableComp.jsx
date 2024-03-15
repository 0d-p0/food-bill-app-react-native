import {Pressable, StyleSheet, Text, View} from 'react-native';
import colors from 'tailwindcss/colors';
import React from 'react';
import {getLighterShade} from '../utils/Color/getLighterShade';

const PressableComp = ({
  onLongPress,
  backgroundColor = colors.indigo[500],
  onPress,
  containerStyle,
  disabled = false,
  children,
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
          elevation: 5,
          ...containerStyle,
        },
      ]}
      onLongPress={onLongPress}
      onPress={onPress}>
      {children}
    </Pressable>
  );
};

export default PressableComp;

const styles = StyleSheet.create({});
