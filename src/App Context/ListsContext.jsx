import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import {initialState, listReducers} from '../reducers/listsReducers';
import {handleGetFoodList} from '../api/api clints/handleFoods';
import {AppStore} from './AppContext';
import {setFoodList, setUnitList} from '../actions/listActions';
import {setCategoryList} from '../actions/foodActions';
import {handleGetCategoryList} from '../api/api clints/handleCategory';
import {handleGetUnitList} from '../api/api clints/handleUnit';

export const ListStore = createContext();

const ListContext = ({children}) => {
  const {token, setLoading, sessionOutReq} = useContext(AppStore);
  const [state, dispatch] = useReducer(listReducers, initialState);
  const {foodList, categoryList, unitList, reportList} = state;
  const [isCategoryLoading, setCategoryLoading] = useState(true);
  const [isUnitLoading, setUnitLoading] = useState(true);

  async function getFoodList() {
    try {
      setLoading(true);
      const response = await handleGetFoodList(token);
      if (!response.success) {
        setLoading(false);
        if (response.status == 401) {
          return sessionOutReq();
        }
      }
      if (response.success) {
        const foodListwithQuantity = response.message.message.map(item => {
          return {...item, quantity: 0};
        });
        dispatch(setFoodList(foodListwithQuantity));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('food error ', error);
    }
  }

  async function getCategoryList() {
    try {
      const response = await handleGetCategoryList(token);
      if (response.success) {
        dispatch(setCategoryList(response.message.data));
      }
      if (!response.success) {
        if (response.status == 401) {
          return sessionOutReq();
        }
        return toast.show(response.message, {type: 'warning'});
      }
      setCategoryLoading(false);
    } catch (error) {
      setCategoryLoading(false);
      console.error('category error ', error);
    }
  }

  async function getUnitList() {
    try {
      const response = await handleGetUnitList(token);
      if (response.success) {
        dispatch(setUnitList(response.message.data));
      }
      setUnitLoading(false);
      if (!response.success) {
        if (response.status == 401) {
          return sessionOutReq();
        }
        return toast.show(response.message, {type: 'warning'});
      }
    } catch (error) {
      setUnitLoading(false);
      console.error('unit error ', error);
    }
  }

  useEffect(() => {
    if (!token) {
      return;
    }
    if (foodList.length == 0) {
      getFoodList();
    }
    if (categoryList.length == 0) {
      getCategoryList();
    }
    if (unitList.length == 0) {
      getUnitList();
    }
  }, []);
  return (
    <ListStore.Provider
      value={{state, dispatch, isCategoryLoading, isUnitLoading}}>
      {children}
    </ListStore.Provider>
  );
};

export default ListContext;
