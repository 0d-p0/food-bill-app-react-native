import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const LoadingComp = () => {
  return (
    <View style={styles.container}>
      {/* Blurred background */}
      {/* Content */}
      <View style={styles.content}>
        <Image
          source={require('../res/images/loadinggif.gif')}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white color
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  image: {
    height: 400,
    width: 400,
  },
});

export default LoadingComp;
