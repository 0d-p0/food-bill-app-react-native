import {createContext, useEffect, useReducer, useState} from 'react';
import {
  getData,
  getObjectData,
  removeItemValue,
} from '../utils/AsyncStorage/asyncOperation';
import SplashScreen from '../screens/SplashScreen';
import LoadingComp from '../Components/LoadingComp';
import ShopDetailsCreateScreen from '../screens/ShopDetailsCreateScreen';
import foodReducers, {initialState} from '../reducers/foodReducers';
import {useToast} from 'react-native-toast-notifications';

export const AppStore = createContext();

const AppContext = ({children}) => {
  const toast = useToast();
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [intialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shopDetails, setShopDetails] = useState(false);
  const [foodState, foodDispatch] = useReducer(foodReducers, initialState);

  useEffect(() => {
    async function checkIsUserLogedIn() {
      const token = await getData('token');
      const shopDetails = await getObjectData('shopDetails');

      setTimeout(() => {
        setInitialLoading(false);
      }, 2000);

      if (!token) {
        return;
      }
      setToken(token);

      if (!shopDetails) {
        return;
      }

      setShopDetails(shopDetails);
      setIsLogin(true);
    }
    checkIsUserLogedIn();
  }, []);

  async function sessionOutReq() {
    const tokenResponse = await removeItemValue('token');
    const shopResponse = await removeItemValue('shopDetails');
    if (tokenResponse && shopResponse) {
      setIsLogin(false);
      toast.show('Session Out \nplease login again', {
        type: 'warning',
        duration: 5000,
      });

      return;
    }

    toast.show('operation failed', {
      type: 'danger',
    });
  }

  if (intialLoading) {
    return <SplashScreen />;
  }

  return (
    <AppStore.Provider
      value={{
        isLogin,
        token,
        shopDetails,
        setIsLogin,
        setLoading,
        setShopDetails,
        setToken,
        foodState,
        foodDispatch,
        sessionOutReq,
      }}>
      {!loading && !shopDetails && token && <ShopDetailsCreateScreen />}
      {children}
      {loading && <LoadingComp />}
    </AppStore.Provider>
  );
};

export default AppContext;
