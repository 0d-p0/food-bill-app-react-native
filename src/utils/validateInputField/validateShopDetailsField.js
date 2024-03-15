import {
  setAddressError,
  setPhoneNumberError,
  setShopName,
  setShopNameError,
} from '../../actions/shopDetailsActions';

const ShopDetailsValidator = (state, dispatch) => {
  const {shopName, phoneNumber, address, gstNumber} = state;
  if (!shopName) {
    dispatch(setShopNameError('please add Your shopName'));
    return true;
  }
  dispatch(setShopNameError(''));

  if (!phoneNumber) {
    dispatch(setPhoneNumberError('please add Your Number'));
    return true;
  }
  dispatch(setPhoneNumberError(''));

  if (!address) {
    dispatch(setAddressError('please add Your Address'));
    return true;
  }
  dispatch(setAddressError(''));

  return false;
};

export default ShopDetailsValidator;
