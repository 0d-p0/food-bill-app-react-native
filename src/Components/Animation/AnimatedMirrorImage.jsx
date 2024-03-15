import React, {useRef, useEffect, useState} from 'react';
import {TouchableOpacity, Animated, Image, StyleSheet} from 'react-native';

const AnimatedMirrorImage = ({children, mirror, style}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Start with scale 1

  useEffect(() => {
    if (mirror) {
      Animated.timing(scaleAnim, {
        toValue: -1, // Setting to -1 will mirror horizontally
        duration: 500, // Adjust duration as needed
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 1, // Back to original scale
        duration: 500, // No duration for immediate change
        useNativeDriver: true,
      }).start();
    }
  }, [mirror, scaleAnim]);

  return (
    <Animated.View
      style={[styles.container, {transform: [{scaleX: scaleAnim}]}]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // You can add additional styles here if needed
  },
});

export default AnimatedMirrorImage;
