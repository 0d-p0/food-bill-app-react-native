// authReducer.js

const initialState = {
  isRegister: false,
  isPasswordVisible: true,
  email: 'pritam1@mail.com',
  password: '123456',
  emailError: '',
  passwordError: '',
  isEmailFocused: false, // New focus variable for email field
  isPasswordFocused: false, // New focus variable for password field
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_REGISTER':
      return {...state, isRegister: !state.isRegister};
    case 'TOGGLE_PASSWORD_VISIBILITY':
      return {...state, isPasswordVisible: !state.isPasswordVisible};
    case 'SET_EMAIL':
      return {...state, email: action.payload, emailError: ''};
    case 'SET_PASSWORD':
      return {...state, password: action.payload, passwordError: ''};
    case 'SET_EMAIL_ERROR':
      return {...state, emailError: action.payload};
    case 'SET_PASSWORD_ERROR':
      return {...state, passwordError: action.payload};
    case 'SET_EMAIL_FOCUS':
      return {...state, isEmailFocused: action.payload};
    case 'SET_PASSWORD_FOCUS':
      return {...state, isPasswordFocused: action.payload};
    default:
      return state;
  }
};

export default authReducer;
export {initialState};
