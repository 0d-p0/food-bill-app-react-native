import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from 'tailwindcss/colors';

const DeleteAlert = ({
  isVisible,
  onCancel,
  onDelete,
  successText = 'Delete',
}) => {
  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.title}>Are you sure?</Text>
        <Text style={styles.message}>This action cannot be undone.</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onCancel}
            style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete}
            style={[styles.button, styles.deleteButton]}>
            <Text style={styles.buttonText}>{successText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
});

export default DeleteAlert;
