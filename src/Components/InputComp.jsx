import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {Icons} from '../res/icons/icons';
import {FadeInView} from './Animation/FadeInView';

const InputComp = React.forwardRef((props, ref) => {
  const {
    placeholder,
    children,
    onChangeText,
    onEndEditing,
    value,
    keyboardType = 'default',
    secureTextEntry = false,
    mainStyle,
    autoFocus,
    title,
    topClass,
    errorText,
  } = props;

  return (
    <View className={`mt-3 ${topClass}`}>
      <View className="flex-row flex-wrap">
        {title && <Text className="text-black font-medium ml-2 ">{title}</Text>}
        {errorText && (
          <FadeInView duration={500}>
            <Text className="text-red-500 font-medium ml-1 ">
              : {errorText}
            </Text>
          </FadeInView>
        )}
      </View>
      <View
        className={`mt-1 bg-gray-200 p-0 px-3 rounded-xl text-black py-[2px] border-gray-400 focus:border-[1px] flex-row justify-between items-center
         ${mainStyle}`}>
        <TextInput
          ref={ref}
          className="  p-0 text-black w-11/12 text-base"
          autoFocus={autoFocus}
          placeholder={placeholder}
          placeholderTextColor={'black'}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onEndEditing={onEndEditing}
        />
        {children}
      </View>
    </View>
  );
});

export default InputComp;
