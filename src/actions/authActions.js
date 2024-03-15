// authActions.js

const toggleRegister = () => {
  return {type: 'TOGGLE_REGISTER'};
};

const togglePasswordVisibility = () => {
  return {type: 'TOGGLE_PASSWORD_VISIBILITY'};
};

const setEmail = email => {
  return {type: 'SET_EMAIL', payload: email};
};

const setPassword = password => {
  return {type: 'SET_PASSWORD', payload: password};
};

const setEmailError = error => {
  return {type: 'SET_EMAIL_ERROR', payload: error};
};

const setPasswordError = error => {
  return {type: 'SET_PASSWORD_ERROR', payload: error};
};

const setEmailFocus = isFocused => {
  return {type: 'SET_EMAIL_FOCUS', payload: isFocused};
};

const setPasswordFocus = isFocused => {
  return {type: 'SET_PASSWORD_FOCUS', payload: isFocused};
};

export {
  toggleRegister,
  togglePasswordVisibility,
  setEmail,
  setPassword,
  setEmailError,
  setPasswordError,
  setEmailFocus,
  setPasswordFocus,
};
