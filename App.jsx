import {StatusBar, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppContext from './src/App Context/AppContext';
import MainNavigation from './src/Navigation/MainNavigation';
import colors from 'tailwindcss/colors';
import {ToastProvider} from 'react-native-toast-notifications';
import SplashScreen from './src/screens/SplashScreen';
import {color} from './src/res/colors';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={color.primary} barStyle="light-content" />
      <ToastProvider placement="top">
        <AppContext>
          <MainNavigation />
        </AppContext>
      </ToastProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
