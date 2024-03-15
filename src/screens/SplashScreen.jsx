import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from 'tailwindcss/colors';

const SplashScreen = () => {
  return (
    <View style={{backgroundColor: '#e7ffb3'}}>
      <StatusBar backgroundColor={'#e7ffb3'} barStyle="dark-content" />

      <Image
        source={require('../res/images/splashScreengif.gif')}
        className="h-full w-full"
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
