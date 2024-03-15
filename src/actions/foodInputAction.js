// Action types
const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
const SET_SELECTED_UNIT = 'SET_SELECTED_UNIT';
const SET_IS_CATEGORY_FOCUS = 'SET_IS_CATEGORY_FOCUS';
const SET_IS_UNIT_FOCUS = 'SET_IS_UNIT_FOCUS';
const SET_DROPDOWN_CATEGORY = 'SET_DROPDOWN_CATEGORY';
const SET_DROPDOWN_UNIT = 'SET_DROPDOWN_UNIT';
const SET_LOADING_TEXT = 'SET_LOADING_TEXT';
const SET_CATEGORY = 'SET_CATEGORY';
const SET_FOOD_NAME = 'SET_FOOD_NAME';
const SET_FOOD_PRICE = 'SET_FOOD_PRICE';
const SET_UNIT = 'SET_UNIT';
const SET_FOOD_CGST = 'SET_FOOD_CGST';
const SET_FOOD_SGST = 'SET_FOOD_SGST';

// Action creator functions
const setSelectedCategory = newValue => {
  return {type: SET_SELECTED_CATEGORY, payload: newValue};
};

const setSelectedUnit = newValue => {
  return {type: SET_SELECTED_UNIT, payload: newValue};
};

const setIsCategoryFocus = newValue => {
  return {type: SET_IS_CATEGORY_FOCUS, payload: newValue};
};

const setIsUnitFocus = newValue => {
  return {type: SET_IS_UNIT_FOCUS, payload: newValue};
};

const setDropdownCategory = newValue => {
  return {type: SET_DROPDOWN_CATEGORY, payload: newValue};
};

const setDropdownUnit = newValue => {
  return {type: SET_DROPDOWN_UNIT, payload: newValue};
};

const setLoadingText = newValue => {
  return {type: SET_LOADING_TEXT, payload: newValue};
};

const setCategory = newValue => {
  return {type: SET_CATEGORY, payload: newValue};
};

const setFoodName = newValue => {
  return {type: SET_FOOD_NAME, payload: newValue};
};

const setFoodPrice = newValue => {
  return {type: SET_FOOD_PRICE, payload: newValue};
};

const setUnit = newValue => {
  return {type: SET_UNIT, payload: newValue};
};
const setFoodCGST = newValue => {
  return {type: SET_FOOD_CGST, payload: newValue};
};

const setFoodSGST = newValue => {
  return {type: SET_FOOD_SGST, payload: newValue};
};

const setFoodId = foodId => {
  return {type: 'SET_FOOD_ID', payload: foodId};
};
const clearAllField = () => {
  return {type: 'CLEAR_ALL_FIELD'};
};

const changeIsEditing = isEditing => {
  return {type: 'CHANGE_IS_EDITING', payload: isEditing};
};

const chnageDeleteModalShow = () => {
  return {type: 'CHANGE_DELETE_MODAL_SHOW'};
};
export {
  setSelectedCategory,
  setSelectedUnit,
  setIsCategoryFocus,
  setIsUnitFocus,
  setDropdownCategory,
  setDropdownUnit,
  setLoadingText,
  setCategory,
  setFoodName,
  setFoodPrice,
  setUnit,
  setFoodCGST,
  setFoodSGST,
  clearAllField,
  changeIsEditing,
  setFoodId,
  chnageDeleteModalShow,
};
