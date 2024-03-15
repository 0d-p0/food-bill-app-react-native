// // reducers.js

import {calculateTotal} from '../utils/calculateTotal';
import {filteredList} from '../utils/filteredList';

// Action types
const SET_CATEGORY_LIST = 'SET_CATEGORY_LIST';
const SET_CATEGORY_WISE_FOOD_LIST = 'SET_CATEGORY_WISE_FOOD_LIST';
const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
const SET_CATEGORY_TYPE = 'SET_CATEGORY_TYPE';
const SET_SEARCH_VALUES = 'SET_SEARCH_VALUES';
const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
const DIGRESS_QUANTITY = 'DIGRESS_QUANTITY';
const CHANGE_CATEGORY = 'CHANGE_CATEGORY';

const ADD_NEW_FOOD = 'ADD_NEW_FOOD';
const REMOVE_FOOD = 'REMOVE_FOOD';

// Initial state
const initialState = {
  initialFoodList: [],
  categoryList: [],
  categoryWiseFoodList: [],
  orderList: [],
  itemQuantitys: {},
  selectedCategory: null,
  isCategoryTypeOne: true,
  searchValues: '',
  total: {totalPrice: 0, totalQuantity: 0},
};

// Reducers
const foodReducers = (state = initialState, action) => {
  let item;
  switch (action.type) {
    case SET_CATEGORY_LIST:
      return {...state, categoryList: action.payload};
    case SET_CATEGORY_WISE_FOOD_LIST:
      const foodList = action.payload;
      const groupedFoods = foodList.reduce((acc, food) => {
        // Check if the category already exists in the accumulator
        if (!acc[food.category]) {
          // If not, create a new array for the category
          acc[food.category] = [];
        }
        // Push the food object into the corresponding category array
        acc[food.category].push(food);
        return acc;
      }, {});
      const selectedCategory = Object.keys(groupedFoods)[0];

      return {
        ...state,
        categoryWiseFoodList: groupedFoods,
        selectedCategory: selectedCategory,
      };
    case SET_SELECTED_CATEGORY:
      return {...state, selectedCategory: action.payload};
    case SET_CATEGORY_TYPE:
      return {...state, isCategoryTypeOne: action.payload};
    case SET_SEARCH_VALUES:
      const searchValue = action.payload;
      const searchCopyFoodList = state.initialFoodList;
      const searchedList = searchCopyFoodList.filter(item =>
        item.name.toLowerCase().startsWith(searchValue.toLowerCase()),
      );
      return {
        ...state,
        searchValues: action.payload,
        categoryWiseFoodList: searchedList,
      };

    case INCREASE_QUANTITY:
      item = action.payload;
      if (state.itemQuantitys[item._id.toString()] != null) {
        state.itemQuantitys[item._id.toString()]++;
      } else {
        state.itemQuantitys[item._id.toString()] = 1;
      }
      const increaseTotal = {
        totalPrice: state.total.totalPrice + item.price,
        totalQuantity: (state.total.totalQuantity =
          state.total.totalQuantity + 1),
      };

      item['quantity'] = state.itemQuantitys[item._id.toString()];
      const index = state.orderList.findIndex(oitem => oitem._id === item._id);
      let increaseOrder = state.orderList;
      if (index == -1) {
        increaseOrder = [...state.orderList, item];
      }

      return {...state, total: increaseTotal, orderList: increaseOrder};

    case DIGRESS_QUANTITY:
      item = action.payload;
      if (state.itemQuantitys[item._id.toString()] != null) {
        if (state.itemQuantitys[item._id.toString()] == 0) {
          const index = state.orderList.findIndex(
            oitem => oitem._id === item._id,
          );
          const digressOrderList = state.orderList.slice(1, index); // Creates a new array from index 1 to index 3
          return {
            ...state,
            orderList: digressOrderList,
          };
        }
        state.itemQuantitys[item._id.toString()]--;
        if (state.itemQuantitys[item._id.toString()] == 0) {
          const index = state.orderList.findIndex(
            oitem => oitem._id === item._id,
          );
          const digressOrderList = state.orderList.slice(1, index); // Creates a new array from index 1 to index 3
          return {
            ...state,
            orderList: digressOrderList,
          };
        }
      } else {
        state.itemQuantitys[item._id.toString()] = 0;
        return {
          ...state,
        };
      }

      const digressTotal = {
        totalPrice: state.total.totalPrice - item.price,
        totalQuantity: (state.total.totalQuantity =
          state.total.totalQuantity - 1),
      };

      return {...state, total: digressTotal};

    case CHANGE_CATEGORY:
      const category = action.payload;
      return {
        ...state,
        selectedCategory: category,
      };

    case 'CLEAR_ORDER_LIST':
      const total = {totalPrice: 0, totalQuantity: 0};
      return {
        ...state,
        orderList: [],
        total: total,
        itemQuantitys: {},
      };

    case 'CLEAR_ALL':
      return {
        ...state,
        initialFoodList: [],
        categoryList: [],
        categoryWiseFoodList: [],
        orderList: [],
        selectedCategory: null,
        isCategoryTypeOne: true,
        searchValues: '',
        total: {totalPrice: 0, totalQuantity: 0},
      };

    default: {
      console.log('default');
      return state;
    }
  }
};

const updateQuantity = (state, itemId, increment) => {
  if (state.searchValues) {
    return updatedQuantityWithSearchedValues(state, itemId, increment);
  }

  console.log(state.itemQuantitys);
  const updatedList = state.initialFoodList.map(item => {
    if (item._id === itemId) {
      const newQuantity = item.quantity + increment;
      return {...item, quantity: newQuantity >= 0 ? newQuantity : 0};
    }
    return item;
  });

  const updatedOrderList = updatedList.filter(item => item.quantity != 0);

  const updatedCategoryWiseFoodList = filteredList(
    updatedList,
    'category',
    state.selectedCategory,
  );

  const updatedTotal = calculateTotal(updatedList);

  return {
    ...state,
    categoryWiseFoodList: updatedCategoryWiseFoodList,
    total: updatedTotal,
    initialFoodList: updatedList,
    orderList: updatedOrderList,
  };
};

const updatedQuantityWithSearchedValues = (state, itemId, increment) => {
  const updatedList = state.initialFoodList.map(item => {
    if (item._id === itemId) {
      const newQuantity = item.quantity + increment;
      return {...item, quantity: newQuantity >= 0 ? newQuantity : 0};
    }
    return item;
  });

  const updatedCategoryWiseFoodList = updatedList.filter(item =>
    item.name.toLowerCase().startsWith(state.searchValues.toLowerCase()),
  );

  const updatedTotal = calculateTotal(updatedList);

  return {
    ...state,
    categoryWiseFoodList: updatedCategoryWiseFoodList,
    total: updatedTotal,
    initialFoodList: updatedList,
  };
};

export default foodReducers;

export {initialState};
