import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {getLighterShade} from '../utils/Color/getLighterShade';
import colors from 'tailwindcss/colors';
import {color} from '../res/colors';

const SettingComp = ({
  onLongPress,
  backgroundColor = colors.white,
  onPress,
  containerStyle,
  disabled = true,
  children,
  title,
  leftIcon,
}) => {
  const lighterShade = getLighterShade(backgroundColor);
  return (
    <TouchableOpacity
      disabled={disabled}
      // className="bg-blue-600 mt-5 items-center rounded-xl"
      style={(containerStyle, styles.settingContainer)}
      onLongPress={onLongPress}
      onPress={onPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}>
        {/* icon */}
        {leftIcon}
        {/* text */}
        <Text className="text-black text-lg font-normal">{title} </Text>
      </View>
      {/* action / icon */}
      {children}
    </TouchableOpacity>
  );
};

export default SettingComp;

const styles = StyleSheet.create({
  settingContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    backgroundColor: colors.gray[200],
    marginVertical: 5,
  },
});
