import {updateFoodList} from '../actions/listActions';

const initialState = {
  foodList: [],
  categoryList: [],
  unitList: [],
  reportList: [],
};

const listReducers = (state, action) => {
  switch (action.type) {
    case 'SET_FOOD_LIST':
      return {...state, foodList: action.payload};
    case 'SET_CATEGORY_LIST':
      return {...state, categoryList: action.payload};
    case 'SET_UNIT_LIST':
      return {...state, unitList: action.payload};
    case 'SET_REPORT_LIST':
      return {...state, reportList: action.payload};

    case 'ADD_NEW_FOOD':
      const food = action.payload;
      const newFoods = [...state.foodList, food];
      return {...state, foodList: newFoods};

    case 'ADD_NEW_CATEGORY':
      const category = action.payload;
      const newCategories = [...state.categoryList, category];
      return {...state, categoryList: newCategories};

    case 'ADD_NEW_UNIT':
      const unit = action.payload;
      const newUnits = [...state.unitList, unit];
      return {...state, unitList: newUnits};

    case 'REMOVE_FROM_FOOD_LIST':
      const foodId = action.payload;
      const newFoodList = state.foodList.filter(obj => obj._id !== foodId);
      return {...state, foodList: newFoodList};

    case 'REMOVE_FROM_CATEGORY_LIST':
      const categoryId = action.payload;
      const newCategoryList = state.categoryList.filter(
        obj => obj._id !== categoryId,
      );
      return {...state, categoryList: newCategoryList};

    case 'REMOVE_FROM_UNIT_LIST':
      const unitId = action.payload;
      const newUnitList = state.unitList.filter(obj => obj._id !== unitId);
      return {...state, unitList: newUnitList};

    case 'UPDATE_CATEGORY_LIST':
      const {categoryObj, previousId} = action.payload;
      const updatedCategoryList = state.categoryList.map(item => {
        if (item._id == previousId) {
          item._id = categoryObj._id;
          item.name = categoryObj.name;
        }
        return item;
      });
      return {...state, categoryList: updatedCategoryList};

    case 'UPDATE_UNIT_LIST':
      const {unitObj, previousUnitId} = action.payload;
      const updatedUnitList = state.unitList.map(item => {
        if (item._id == previousUnitId) {
          item._id = unitObj._id;
          item.name = unitObj.name;
        }
        return item;
      });
      return {...state, unitList: updatedUnitList};

    case 'UPDATE_FOOD_LIST':
      const {foodObj, previousFoodId} = action.payload;
      const updatedFoodList = state.foodList.map(item => {
        if (item._id == previousFoodId) {
          item._id = foodObj._id;
          item.name = foodObj.name;
          item.category = foodObj.category;
          item.price = foodObj.price;
          item.unit = foodObj.unit;
          item.cgst = foodObj.cgst;
          item.sgst = foodObj.sgst;
          item.quantity = foodObj.quantity;
        }
        return item;
      });
      return {...state, foodList: updatedFoodList};

    default:
      return state;
  }
};

export {initialState, listReducers};
