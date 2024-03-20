// // reducers.js

import {calculateTotal} from '../utils/calculateTotal';
import {filteredList} from '../utils/filteredList';
import {isEmpty} from '../utils/isEmpty';

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
  ogOderList: [],
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
        itemQuantitys: {},
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

      return {
        ...state,
        total: increaseTotal,
        orderList: increaseOrder,
        ogOderList: increaseOrder,
      };

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
            ogOderList: digressOrderList,
          };
        }
        state.itemQuantitys[item._id.toString()]--;
        if (state.itemQuantitys[item._id.toString()] == 0) {
          const index = state.orderList.findIndex(
            oitem => oitem._id === item._id,
          );
          const digressOrderList = state.orderList.slice(1, index); // Creates a new array from index 1 to index 3
          const digressTotal = {
            totalPrice: state.total.totalPrice - item.price,
            totalQuantity: (state.total.totalQuantity =
              state.total.totalQuantity - 1),
          };
          return {
            ...state,
            orderList: digressOrderList,
            total: digressTotal,
            ogOderList: digressOrderList,
          };
        }
      } else {
        state.itemQuantitys[item._id.toString()] = 0;
        return {
          ...state,
        };
      }

      item['quantity'] = state.itemQuantitys[item._id.toString()];
      const findex = state.orderList.findIndex(oitem => oitem._id === item._id);
      let digressOrderList = state.orderList;

      if (findex == -1) {
        digressOrderList = [...state.orderList, item];
      }
      const digressTotal = {
        totalPrice: state.total.totalPrice - item.price,
        totalQuantity: (state.total.totalQuantity =
          state.total.totalQuantity - 1),
      };

      return {
        ...state,
        total: digressTotal,
        ogOderList: digressOrderList,
        orderList: digressOrderList,
      };

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
        ogOderList: [],
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
        ogOderList: [],
        selectedCategory: null,
        isCategoryTypeOne: true,
        searchValues: '',
        total: {totalPrice: 0, totalQuantity: 0},
      };

    case 'DISCOUNT':
      return {
        ...state,
        orderList: calculateDiscount(state.ogOderList, action.payload),
      };
    case 'UPDATE_CATEGORY_NAMES_ON_FOOD_LIST':
      const {newcategory, prevCategory} = action.payload;
      console.log(newcategory, prevCategory);
      const updatedCategoryName = changeCategoryNames(
        state.categoryWiseFoodList,
        newcategory,
        prevCategory,
      );
      if (state.selectedCategory == prevCategory) {
        state.selectedCategory = newcategory;
      }
      return {
        ...state,
        categoryWiseFoodList: updatedCategoryName,
        // selectedCategory: newcategory,
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

function calculateDiscount(orderList, totalDiscountPercentage) {
  var items = orderList; // Make a copy of the original items
  // LOG  {"_id": "65f5290beefd779738f98d37", "category": "900", "cgst": 2, "name": "cat", "price": 12, "quantity": 6, "sgst": 2, "unit": "add new"}
  var totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );


  var discountedItems = [];
  items.forEach(function (item) {
    var discountPercentage = (
      ((item.price * item.quantity) / totalPrice) *
      totalDiscountPercentage
    ).toFixed(2);
    var itemDiscount = item.price * item.quantity * (discountPercentage / 100);

    // console.log('Discount Price = ' + discountPercentage);

    var discountedPrice = item.price * item.quantity - itemDiscount;

    // Create a new FoodListResponse object with the discounted price
    var foodItem = {
      _id: item._id,
      originalPrice: item.price,
      price: parseFloat((discountedPrice / item.quantity).toFixed(2)),
      name: item.name,
      cgst: item.cgst,
      sgst: item.sgst,
      category: item.category,
      unit: item.unit,
      quantity: item.quantity,
      discountPercentage: parseFloat(discountPercentage),
    };

    // Create a new OrderItem with the discounted price and add it to the list

    discountedItems.push(foodItem);
  });
   
  

  return discountedItems;
}

function changeCategoryNames(obj, newCategory, prevCategory) {
  // Get the "Fresh change" array
  let freshChangeArray = obj[prevCategory];

  if (!freshChangeArray) {
    return obj;
  }
  // Remove the "Fresh change" key
  delete obj[prevCategory];

  // Add a new key with the name "fresh" and assign the array to it
  obj[newCategory] = freshChangeArray;

  // Iterate over each category object in the "fresh" array
  for (let categoryObj of freshChangeArray) {
    // change the category key and names
    categoryObj.category = newCategory;
  }

  return obj;
}

export default foodReducers;

export {initialState};
