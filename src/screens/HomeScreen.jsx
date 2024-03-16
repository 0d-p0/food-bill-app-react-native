import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useReducer, useState} from 'react';
import InputComp from '../Components/InputComp';
import colors from 'tailwindcss/colors';
import ButtonComp from '../Components/ButtonComp';
import {Icons} from '../res/icons/icons';
import SingleFoodComp from '../Components/SingleFoodComp';
import {AppStore} from '../App Context/AppContext';
import {ListStore} from '../App Context/ListsContext';
import foodReducers, {initialState} from '../reducers/foodReducers';
import {
  changeCategory,
  clearAll,
  setCategoryType,
  setCategoryWiseFoodList,
  setSearchValues,
} from '../actions/foodActions';
import {Toast} from 'react-native-toast-notifications';
import {isEmpty} from '../utils/isEmpty';
import {FlashList} from '@shopify/flash-list';

const HomeScreen = ({navigation}) => {
  const {shopDetails, foodState, foodDispatch} = useContext(AppStore);
  const {state} = useContext(ListStore);
  const {foodList} = state;
  const {
    orderList,
    itemQuantitys,
    categoryWiseFoodList,
    selectedCategory,
    isCategoryTypeOne,
    total,
  } = foodState;

  useEffect(() => {
    if (foodList.length == 0) {
      return;
    }
    foodDispatch(setCategoryWiseFoodList(foodList));
    return () => {
      foodDispatch(clearAll());
    };
  }, [foodList]);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [intialListLen, setInitialListLen] = useState(10);

  // Function to load more items when the end of the list is reached
  const loadMoreItems = () => {
    if (categoryWiseFoodList.length - 1 <= intialListLen) {
      return;
    }
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      // Simulate an API call with setTimeout
      setTimeout(() => {
        // Increase the number of initially rendered items by 10
        setInitialListLen(prevLen => prevLen + 10);
        setIsLoadingMore(false);
      }, 200); // Simulated delay for loading more items
    }
  };

  return (
    <SafeAreaView className="h-full bg-slate-200 ">
      {/* Header */}
      {isCategoryTypeOne && (
        <View className="h-1/6 bg-indigo-500 rounded-b-3xl items-center justify-center ">
          {/* Shop Name */}
          <Text className="text-3xl font-semibold mb-10 text-white uppercase text-center">
            {shopDetails?.name}
          </Text>
          {/* Search Container  */}
          <View className="bg-white w-11/12 shadow-xl rounded-xl absolute -bottom-8 justify-center p-4 ">
            <InputComp
              onChangeText={value => {
                foodDispatch(setSearchValues(value));
              }}
              mainStyle="border-[1px] border-gray-500 bg-gray-100 rounded-full"
              topClass={'-mt-2'}
              placeholder={'Search ... '}
            />
          </View>
        </View>
      )}
      {/* Category Container */}
      {!isEmpty(categoryWiseFoodList) && (
        <View
          className={`bg-white  rounded p-2 ${
            isCategoryTypeOne ? 'mt-12' : 'mt-2'
          }`}>
          {/* Category Title */}
          <View className="flex-row  items-center p-1">
            <Text className="text-gray-700 text-base font-medium pb-2 mr-2  capitalize">
              Category
            </Text>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? colors.blue[200]
                    : colors.gray[200],
                  borderRadius: 20,
                },
              ]}
              onPress={() => {
                foodDispatch(setCategoryType(!isCategoryTypeOne));
              }}>
              {isCategoryTypeOne ? (
                <Icons.arrowDownIcon color={colors.blue[400]} size={30} />
              ) : (
                <Icons.arrowUpIcon color={colors.blue[400]} size={30} />
              )}
            </Pressable>
          </View>
          {/* Category List */}
          <ScrollView
            horizontal={true}
            keyboardShouldPersistTaps="always"
            showsHorizontalScrollIndicator={false}>
            {!isEmpty(categoryWiseFoodList) &&
              Object.keys(categoryWiseFoodList).map((props, index) => (
                <ButtonComp
                  onPress={() => {
                    foodDispatch(changeCategory(props));
                    setInitialListLen(4);
                  }}
                  title={props}
                  key={index}
                  backgroundColor={
                    props == selectedCategory
                      ? colors.indigo[500]
                      : colors.white
                  }
                  textClassName={`text-base capitalize font-normal   ${
                    props == selectedCategory ? 'text-white' : 'text-black'
                  }`}
                  containerStyle={{
                    marginTop: 0,
                    marginRight: 10,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    elevation: 0,
                    borderColor: colors.indigo[500],
                    borderWidth: 2,
                  }}
                />
              ))}
          </ScrollView>
        </View>
      )}

      <View
        className={`bg-white flex-1  ${
          isEmpty(categoryWiseFoodList) ? 'mt-14' : 'mt-2'
        }`}>
        {/* Food Container */}
        <View className="flex-[10] px-3 py-2">
          {isEmpty(categoryWiseFoodList) && (
            <Image
              source={require('../res/images/emptyState.gif')}
              style={{height: '95%', width: '100%'}}
            />
          )}

          {!isEmpty(categoryWiseFoodList) && (
            <FlashList
              estimatedItemSize={50}
              data={categoryWiseFoodList?.[selectedCategory]?.slice(
                0,
                intialListLen,
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <SingleFoodComp
                  key={index}
                  item={item}
                  dispatch={foodDispatch}
                  itemQuantitys={itemQuantitys}
                />
              )}
              initialNumToRender={10} // Render the first 10 items initially
              onEndReachedThreshold={0.4} // Load more items when user has scrolled 90% from the bottom
              onEndReached={loadMoreItems} // Load more items when end is reached
              ListFooterComponent={() =>
                isLoadingMore ? (
                  <Text className="text-gray-500 text-center w-full">
                    Fetching more ...
                  </Text>
                ) : (
                  <Text className="text-gray-500 text-center w-full">
                    END OF THE LIST !
                  </Text>
                )
              }
            />
          )}
        </View>

        {/* item info [quantity, Price] and Preview Button */}
        {!isEmpty(categoryWiseFoodList) && (
          <View className="flex-[2] bg-slate-50 divide-x-2  flex-row justify-between items-center">
            {/* Item Quantity and Price */}
            <View className="max-w-6/12 px-5">
              <Text className="text-black text-base font-medium ">
                Total Items{' '}
                <Text className="text-green-700 text-lg font-medium ml-3 ">
                  {total.totalQuantity}
                </Text>
              </Text>

              <Text className="text-black text-base font-medium">
                Total Price{' '}
                <Text className="text-green-700 text-lg font-medium ml-3 ">
                  ₹{total.totalPrice.toFixed(2)}
                </Text>
              </Text>
            </View>

            {/* Preview Button */}
            <View className="flex-1 px-5">
              <ButtonComp
                backgroundColor={colors.indigo[500]}
                title={'Preview'}
                containerStyle={{marginTop: 0, letterSpacing: 2}}
                textClassName={'tracking-widest '}
                onPress={() => {
                  if (total.totalPrice == 0) {
                    Toast.show('please add item before Proceed', {
                      type: 'warning',
                    });
                    return;
                  }
                  navigation.navigate('orderDetails');
                }}
              />
              {/* <Text className="text-white absolute text-2xl right-10 top-[7px]">{`>`}</Text> */}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
