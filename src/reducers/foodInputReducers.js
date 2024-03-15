// reducers.js

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

// Reducers
const initialState = {
  selectedCategory: null,
  selectedUnit: null,
  isCategoryFocus: false,
  isUnitFocus: false,
  dropdownCategory: [],
  dropdownUnit: [],
  loadingText: 'Loading',
  foodId: '',
  category: '',
  foodName: '',
  foodPrice: '',
  unit: '',
  foodCGST: '',
  foodSGST: '',
  isEditing: false,
  isDeleModalShowing: false,
};

const foodInputReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CATEGORY:
      return {...state, selectedCategory: action.payload};
    case SET_SELECTED_UNIT:
      return {...state, selectedUnit: action.payload};
    case SET_IS_CATEGORY_FOCUS:
      return {...state, isCategoryFocus: action.payload};
    case SET_IS_UNIT_FOCUS:
      return {...state, isUnitFocus: action.payload};
    case SET_DROPDOWN_CATEGORY:
      return {...state, dropdownCategory: action.payload};
    case SET_DROPDOWN_UNIT:
      return {...state, dropdownUnit: action.payload};
    case SET_LOADING_TEXT:
      return {...state, loadingText: action.payload};
    case SET_CATEGORY:
      return {...state, category: action.payload};
    case SET_FOOD_NAME:
      return {...state, foodName: action.payload};
    case SET_FOOD_PRICE:
      return {...state, foodPrice: action.payload};
    case SET_UNIT:
      return {...state, unit: action.payload};
    case SET_FOOD_CGST:
      return {...state, foodCGST: action.payload};
    case SET_FOOD_SGST:
      return {...state, foodSGST: action.payload};
    case 'SET_FOOD_ID':
      return {...state, foodId: action.payload};
    case 'CLEAR_ALL_FIELD':
      return {
        ...state,
        selectedCategory: null,
        selectedUnit: null,
        selectedCategory: null,
        category: '',
        foodName: '',
        foodPrice: '',
        unit: '',
        foodCGST: '',
        foodSGST: '',
        foodId: '',
      };
    case 'CHANGE_IS_EDITING':
      return {...state, isEditing: action.payload};
    case 'CHANGE_DELETE_MODAL_SHOW':
      return {...state, isDeleModalShowing: !state.isDeleModalShowing};
    default:
      return state;
  }
};

export default foodInputReducers;

export {initialState};
