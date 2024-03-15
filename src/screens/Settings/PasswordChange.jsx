import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import colors from 'tailwindcss/colors';
import InputComp from '../../Components/InputComp';
import {Icons} from '../../res/icons/icons';
import {Toast} from 'react-native-toast-notifications';
const iconSize = 25;
const iconColor = colors.indigo[400];
const PasswordChangeModal = ({isVisible, onClose, onSubmit}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordShow, setOldPasswordShow] = useState(true);
  const [newPasswordShow, setNewPasswordShow] = useState(true);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);

  const handleChangePassword = () => {
    // Validate passwords and call onSubmit if validation passes
    if (!oldPassword || !newPassword || !confirmPassword) {
      Toast.show('Please fill in all fields.', {
        type: 'warning',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      Toast.show('New password and confirm password do not match.', {
        type: 'warning',
      });
      return;
    }
    onSubmit(oldPassword, newPassword);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Change Password</Text>

          <InputComp
            title={'Old Password'}
            placeholder={'Enter Password'}
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry={oldPasswordShow}
            mainStyle={'h-10'} // Apply error style if password error exists
          >
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? colors.blue[200]
                    : colors.gray[200],
                  borderRadius: 20,
                },
              ]}
              onPress={() => setOldPasswordShow(!oldPasswordShow)}>
              {oldPasswordShow ? (
                <Icons.eyeIcon color={iconColor} size={iconSize} />
              ) : (
                <Icons.eyeOffIcon color={iconColor} size={iconSize} />
              )}
            </Pressable>
          </InputComp>

          <InputComp
            title={'New Password'}
            placeholder={'Enter Password'}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={newPasswordShow}
            mainStyle={'h-10'}>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? colors.blue[200]
                    : colors.gray[200],
                  borderRadius: 20,
                },
              ]}
              onPress={() => setNewPasswordShow(!newPasswordShow)}>
              {newPasswordShow ? (
                <Icons.eyeIcon color={iconColor} size={iconSize} />
              ) : (
                <Icons.eyeOffIcon color={iconColor} size={iconSize} />
              )}
            </Pressable>
          </InputComp>
          <InputComp
            title={'Confirm Password'}
            placeholder={'Enter Password'}
            mainStyle={'h-10'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={confirmPasswordShow}>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? colors.blue[200]
                    : colors.gray[200],
                  borderRadius: 20,
                },
              ]}
              onPress={() => setConfirmPasswordShow(!confirmPasswordShow)}>
              {confirmPasswordShow ? (
                <Icons.eyeIcon color={iconColor} size={iconSize} />
              ) : (
                <Icons.eyeOffIcon color={iconColor} size={iconSize} />
              )}
            </Pressable>
          </InputComp>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleChangePassword}
              style={[styles.button, styles.changeButton]}>
              <Text style={styles.buttonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 10,
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
    backgroundColor: colors.gray[500],
  },
  changeButton: {
    backgroundColor: colors.indigo[500],
  },
});

export default PasswordChangeModal;
