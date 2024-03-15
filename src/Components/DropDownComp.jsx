import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import colors, {gray} from 'tailwindcss/colors';

const DropDownComp = ({data, isFocus, value, setIsFocus, setValue, title}) => {
  const missingProps = [];

  // Check if required props are provided
  if (!data) missingProps.push('data');
  if (typeof isFocus === 'undefined') missingProps.push('isFocus');
  if (typeof value === 'undefined') missingProps.push('value');
  if (!setIsFocus) missingProps.push('setIsFocus');
  if (!setValue) missingProps.push('setValue');
  if (!title) missingProps.push('title');

  // If any props are missing, throw an error
  if (missingProps.length > 0) {
    throw new Error(
      `DropDownComp: Required props are missing: ${missingProps.join(', ')}`,
    );
  }
  return (
    <Dropdown
      containerStyle={styles.container}
      style={[styles.dropdown, isFocus && {borderWidth: 2}]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      itemTextStyle={{
        color: colors.black,
        backgroundColor: colors.gray[100],
        padding: 5,
        borderRadius: 5,
        margin: -14,
      }}
      data={data}
      // search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? title : '...'}
      // searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item.value);
        setIsFocus(false);
      }}
    />
  );
};

export default DropDownComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: gray[200],
  },
  dropdown: {
    flex: 1,
    marginTop: 10,
    height: 40,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: colors.gray[200],
  },

  placeholderStyle: {
    fontSize: 16,
    color: colors.black,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
