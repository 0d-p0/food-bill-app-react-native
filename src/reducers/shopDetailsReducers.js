const initialState = {
  shopName: '',
  phoneNumber: '',
  address: '',
  gstNumber: '',
  shopNameError: '',
  phoneNumberError: '',
  addressError: '',
  gstNumberError: '',
};

// Define reducer function
const shopDetailsReducers = (state, action) => {
  switch (action.type) {
    case 'SET_SHOP_NAME':
      return {...state, shopName: action.payload};
    case 'SET_PHONE_NUMBER':
      return {...state, phoneNumber: action.payload};
    case 'SET_ADDRESS':
      return {...state, address: action.payload};
    case 'SET_GST_NUMBER':
      return {...state, gstNumber: action.payload};

    case 'SET_FULL_DETAILS':
      const shopDetails = action.payload;
      const {GST, address, name, number} = shopDetails || {};
      return {
        ...state,
        gstNumber: GST,
        address: address,
        phoneNumber: number,
        shopName: name,
      };

    case 'SET_SHOP_NAME_ERROR':
      return {...state, shopNameError: action.payload};
    case 'SET_PHONE_NUMBER_ERROR':
      return {...state, phoneNumberError: action.payload};
    case 'SET_ADDRESS_ERROR':
      return {...state, addressError: action.payload};
    case 'SET_GST_NUMBER_ERROR':
      return {...state, gstNumberError: action.payload};
    default:
      return state;
  }
};

export default shopDetailsReducers;

export {initialState};
