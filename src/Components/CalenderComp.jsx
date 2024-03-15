import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import colors from 'tailwindcss/colors';

const CalenderComp = ({date, onChange}) => {
  return (
    <>
      <DateTimePicker
        mode="single"
        date={date}
        onChange={onChange}
        calendarTextStyle={{color: colors.gray[500]}}
        selectedItemColor={colors.indigo[500]}
        headerTextStyle={{color: colors.black}}
        weekDaysContainerStyle={{}}
        weekDaysTextStyle={{color: colors.gray[950]}}
      />
    </>
  );
};

export default CalenderComp;

const styles = StyleSheet.create({});
