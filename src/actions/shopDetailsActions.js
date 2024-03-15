const setShopName = shopName => {
  return {type: 'SET_SHOP_NAME', payload: shopName};
};

const setPhoneNumber = phoneNumber => {
  return {type: 'SET_PHONE_NUMBER', payload: phoneNumber};
};

const setAddress = address => {
  return {type: 'SET_ADDRESS', payload: address};
};

const setGSTNumber = gstNumber => {
  return {type: 'SET_GST_NUMBER', payload: gstNumber};
};

const setFullDetails = shopDetails => {
  return {type: 'SET_FULL_DETAILS', payload: shopDetails};
};

const setShopNameError = shopName => {
  return {type: 'SET_SHOP_NAME_ERROR', payload: shopName};
};

const setPhoneNumberError = phoneNumber => {
  return {type: 'SET_PHONE_NUMBER_ERROR', payload: phoneNumber};
};

const setAddressError = address => {
  return {type: 'SET_ADDRESS_ERROR', payload: address};
};

const setGSTNumberError = gstNumber => {
  return {type: 'SET_GST_NUMBER_ERROR', payload: gstNumber};
};

export {
  setShopName,
  setPhoneNumber,
  setAddress,
  setGSTNumber,
  setFullDetails,
  setShopNameError,
  setPhoneNumberError,
  setAddressError,
  setGSTNumberError,
};
