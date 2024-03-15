// Action creators

const setFoodList = foodList => {
  return {type: 'SET_FOOD_LIST', payload: foodList};
};

const setCategoryList = categoryList => {
  return {type: 'SET_CATEGORY_LIST', payload: categoryList};
};

const setUnitList = unitList => {
  return {type: 'SET_UNIT_LIST', payload: unitList};
};

const setReportList = reportList => {
  return {type: 'SET_REPORT_LIST', payload: reportList};
};

const addNewFood = food => {
  return {type: 'ADD_NEW_FOOD', payload: food};
};
const addNewCategory = category => {
  return {type: 'ADD_NEW_CATEGORY', payload: category};
};

const addNewUnit = unit => {
  return {type: 'ADD_NEW_UNIT', payload: unit};
};

const removeFromFoodList = foodId => {
  return {type: 'REMOVE_FROM_FOOD_LIST', payload: foodId};
};

const removeFromCateGoryList = foodId => {
  return {type: 'REMOVE_FROM_CATEGORY_LIST', payload: foodId};
};

const removeFromUnitList = foodId => {
  return {type: 'REMOVE_FROM_UNIT_LIST', payload: foodId};
};

const updateCategoryList = (categoryObj, previousId) => {
  return {type: 'UPDATE_CATEGORY_LIST', payload: {categoryObj, previousId}};
};

const updateUnitList = (unitObj, previousUnitId) => {
  return {type: 'UPDATE_UNIT_LIST', payload: {unitObj, previousUnitId}};
};

const updateFoodList = (foodObj, previousFoodId) => {
  return {type: 'UPDATE_FOOD_LIST', payload: {foodObj, previousFoodId}};
};

export {
  setFoodList,
  setCategoryList,
  setUnitList,
  setReportList,
  addNewCategory,
  addNewUnit,
  addNewFood,
  removeFromFoodList,
  removeFromCateGoryList,
  removeFromUnitList,
  updateCategoryList,
  updateUnitList,
  updateFoodList,
};
