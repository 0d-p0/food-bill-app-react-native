// Action creators
const setCategoryWiseFoodList = foodList => {
  return {type: 'SET_CATEGORY_WISE_FOOD_LIST', payload: foodList};
};

const setCategoryList = categoryList => {
  return {type: 'SET_CATEGORY_LIST', payload: categoryList};
};

// Accept String
const setSelectedCategory = category => {
  return {type: 'SET_SELECTED_CATEGORY', payload: category};
};

// accept bool [true and false]
const setCategoryType = categoryType => {
  return {type: 'SET_CATEGORY_TYPE', payload: categoryType};
};

// Accept String
const setSearchValues = searchValue => {
  return {type: 'SET_SEARCH_VALUES', payload: searchValue};
};

const increaseQuantity = item => {
  return {type: 'INCREASE_QUANTITY', payload: item};
};

const digressQuantity = item => {
  return {type: 'DIGRESS_QUANTITY', payload: item};
};

const changeCategory = category => {
  return {type: 'CHANGE_CATEGORY', payload: category};
};

const clearOrderList = () => {
  return {type: 'CLEAR_ORDER_LIST'};
};

const handleDiscount = percent => {
  return {type: 'DISCOUNT', payload: percent};
};

const updateCategoryOnFoodLists = (newcategory, prevCategory) => {
  return {
    type: 'UPDATE_CATEGORY_NAMES_ON_FOOD_LIST',
    payload: {newcategory, prevCategory},
  };
};
const clearAll = () => {
  return {type: 'CLEAR_ALL'};
};

export {
  setCategoryList,
  setCategoryWiseFoodList,
  setSelectedCategory,
  setCategoryType,
  setSearchValues,
  increaseQuantity,
  digressQuantity,
  changeCategory,
  clearOrderList,
  clearAll,
  handleDiscount,
  updateCategoryOnFoodLists,
};
