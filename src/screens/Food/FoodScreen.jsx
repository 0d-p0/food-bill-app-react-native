import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useReducer, useState} from 'react';
import InputComp from '../../Components/InputComp';
import ButtonComp from '../../Components/ButtonComp';
import ItemActionComp from '../../Components/ItemActionComp';
import colors, {gray} from 'tailwindcss/colors';

import DropDownComp from '../../Components/DropDownComp';
import SpcaerComp from '../../Components/SpcaerComp';
import {ListStore} from '../../App Context/ListsContext';
import {isEmpty} from '../../utils/isEmpty';
import foodInputReducers, {
  initialState,
} from '../../reducers/foodInputReducers';

import {
  changeIsEditing,
  chnageDeleteModalShow,
  clearAllField,
  setDropdownCategory,
  setDropdownUnit,
  setFoodCGST,
  setFoodId,
  setFoodName,
  setFoodPrice,
  setFoodSGST,
  setIsCategoryFocus,
  setIsUnitFocus,
  setLoadingText,
  setSelectedCategory,
  setSelectedUnit,
} from '../../actions/foodInputAction';
import {validateFoodInputField} from '../../utils/validateInputField/validateFoodInputField';
import {Toast} from 'react-native-toast-notifications';
import {
  handleDeleteFood,
  handleEditFood,
  handleSaveNewFood,
} from '../../api/api clints/handleFoods';
import {AppStore} from '../../App Context/AppContext';
import {
  removeFromFoodList,
  addNewFood,
  updateFoodList,
} from '../../actions/listActions';
import {FlashList} from '@shopify/flash-list';
import VisibleComp from '../../Components/VisibleComp';
import DeleteAlert from '../../Components/DeleteAlertComp';
import {color} from '../../res/colors';

// const data = [{label: 'Item 1', value: '1'}];

const FoodScreen = ({navigation}) => {
  const {token, setLoading, sessionOutReq, foodState} = useContext(AppStore);
  const {state, isCategoryLoading, isUnitLoading, dispatch} =
    useContext(ListStore);
  const {foodList, categoryList, unitList} = state;

  const [inputState, inputDispatch] = useReducer(
    foodInputReducers,
    initialState,
  );

  const {
    selectedCategory,
    selectedUnit,
    isCategoryFocus,
    isUnitFocus,
    dropdownCategory,
    dropdownUnit,
    loadingText,
    foodName,
    foodPrice,
    foodCGST,
    foodSGST,
    isEditing,
    foodId,
    isDeleModalShowing,
  } = inputState;

  useEffect(() => {
    //  LOG  {"_id": "65b4f6ad5247881412c20366", "name": "dinner"}

    if (!isEmpty(categoryList)) {
      const category = categoryList.map(item => {
        return {label: item.name, value: item._id};
      });
      inputDispatch(setDropdownCategory(category));
    }

    if (!isEmpty(unitList)) {
      const unit = unitList.map(item => {
        return {label: item.name, value: item._id};
      });
      inputDispatch(setDropdownUnit(unit));
    }
  }, [categoryList, unitList]);

  useEffect(() => {
    // Set up a timer to update the loading text every second
    let timer;

    if (isCategoryLoading || isUnitLoading) {
      timer = setInterval(() => {
        // Update loading text (e.g., add dots to indicate loading)
        inputDispatch(
          setLoadingText(prevText => {
            if (prevText === 'Loading...') {
              return 'Loading';
            } else {
              return prevText + '.';
            }
          }),
        );
      }, 1000);
    }

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [isCategoryLoading, isUnitLoading]);

  // handle change Editing Mode
  useEffect(() => {
    if (!isEditing) {
      inputDispatch(clearAllField());
    }
  }, [isEditing]);

  async function performSaveFood() {
    const isValidate = validateFoodInputField(inputState);
    if (!isValidate.success) {
      return Toast.show(isValidate.message, {
        type: 'warning',
        duration: 2000,
      });
    }

    setLoading(true);
    const response = await handleSaveNewFood(token, {
      foodName: foodName,
      foodPrice: foodPrice,
      foodUnit: selectedUnit,
      foodCategory: selectedCategory,
      cgst: foodCGST,
      sgst: foodSGST,
    });

    if (!response.success) {
      setLoading(false);
      if (response.status == 401) {
        return sessionOutReq();
      }
      Toast.show(response.message, {
        type: 'danger',
      });
      return;
    }

    const food = response.message.newFood;
    // Remove fields
    delete food.__v;
    delete food.createdAt;
    delete food.updatedAt;

    // Destructuring assignment for cleaner syntax
    const unitName = food.unit.name;
    const categoryName = food.category.name;

    // Modify the object using spread syntax
    food.unit = unitName;
    food.category = categoryName;

    // Add the quantity field with value 0
    food.quantity = 0;
    dispatch(addNewFood(food));
    Toast.show('New Food Added', {
      type: 'success',
    });
    setLoading(false);
    inputDispatch(clearAllField());
  }

  async function performDeleteFood(foodId) {
    try {
      if (!foodId) {
        return Toast.show('Food ID Not Found');
      }

      setLoading(true);
      const response = await handleDeleteFood(token, {foodId});

      if (!response.success) {
        setLoading(false);
        inputDispatch(chnageDeleteModalShow());

        if (response.status == 401) {
          return sessionOutReq();
        }
        Toast.show(response.message, {type: 'warning'});
        return;
      }
      dispatch(removeFromFoodList(foodId));
      Toast.show('food Deleted successFull', {type: 'success'});
      inputDispatch(chnageDeleteModalShow());
      inputDispatch(setFoodId(''));
      setLoading(false);
    } catch (error) {
      inputDispatch(chnageDeleteModalShow());
      inputDispatch(setFoodId(''));

      Toast.show('some error occur', {
        type: 'danger',
      });
    }
  }

  async function performEditFood() {
    const isValidate = validateFoodInputField(inputState);
    if (!isValidate.success) {
      return Toast.show(isValidate.message, {
        type: 'warning',
        duration: 2000,
      });
    }

    if (!foodId) {
      return Toast.show('food id not found', {
        type: 'warning',
        duration: 2000,
      });
    }

    setLoading(true);
    const response = await handleEditFood(token, {
      foodId: foodId,
      categoryId: selectedCategory,
      unitId: selectedUnit,
      foodName: foodName,
      foodPrice: foodPrice,
      cgst: foodCGST,
      sgst: foodSGST,
    });

    if (!response.success) {
      setLoading(false);
      if (response.status == 401) {
        return sessionOutReq();
      }
      Toast.show(response.message, {
        type: 'danger',
      });
      return;
    }

    console.log('updated food ' + JSON.stringify(response.message.updatedFood));
    const food = response.message.updatedFood;
    // Remove fields
    delete food.__v;
    delete food.createdAt;
    delete food.updatedAt;

    // Destructuring assignment for cleaner syntax
    const unitName = food.unit.name;
    const categoryName = food.category.name;

    // Modify the object using spread syntax
    food.unit = unitName;
    food.category = categoryName;

    // Add the quantity field with value 0
    food.quantity = 0;

    dispatch(updateFoodList(food, foodId));
    Toast.show('food edited successfully', {type: 'success'});
    // inputDispatch(clearAllField());
    inputDispatch(changeIsEditing(false));
    setLoading(false);
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      className=" flex-1 p-2 "
      style={{backgroundColor: color.background}}>
      {/* Food Name */}
      <View>
        <InputComp
          placeholder={'Enter Food Name'}
          title={'New Food'}
          mainStyle={'h-10'}
          value={foodName}
          onChangeText={value => inputDispatch(setFoodName(value))}
        />
        {isEditing && (
          <TouchableOpacity
            className="absolute top-3 right-3"
            onPress={() => inputDispatch(changeIsEditing(false))}>
            <Text className="text-red-500 text font-medium">Close Editing</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Food Price */}
      <VisibleComp isVisible={foodName}>
        <InputComp
          placeholder={'Enter Food Price'}
          mainStyle={'h-10'}
          topClass={'mt-2'}
          keyboardType="numeric"
          value={foodPrice}
          onChangeText={value => inputDispatch(setFoodPrice(value))}
        />
      </VisibleComp>
      <VisibleComp isVisible={foodPrice}>
        <View className="flex-row justify-between">
          <InputComp
            placeholder={'Food CGST'}
            mainStyle={'h-10'}
            topClass={'mt-2 flex-1'}
            keyboardType="numeric"
            value={foodCGST}
            onChangeText={value => inputDispatch(setFoodCGST(value))}
          />
          <SpcaerComp width={15} />
          <InputComp
            placeholder={'Food SGST'}
            mainStyle={'h-10'}
            topClass={'mt-2 flex-1'}
            keyboardType="numeric"
            value={foodSGST}
            onChangeText={value => inputDispatch(setFoodSGST(value))}
          />
        </View>
      </VisibleComp>

      {/* Category and Unit in DropDown View */}
      <VisibleComp isVisible={foodCGST && foodSGST}>
        <View className="flex-row justify-between">
          {isEmpty(dropdownCategory) ? (
            <Text className="flex-1 text-black text-base self-center bg-gray-200 p-2 mt-2 rounded-xl">
              {isCategoryLoading
                ? `Category ${loadingText}`
                : 'No Category Found'}
            </Text>
          ) : (
            <DropDownComp
              data={dropdownCategory}
              isFocus={isCategoryFocus}
              value={selectedCategory}
              setValue={value => inputDispatch(setSelectedCategory(value))}
              setIsFocus={value => inputDispatch(setIsCategoryFocus(value))}
              title={'Select Category'}
            />
          )}
          <View className="px-2" />
          {isEmpty(dropdownUnit) ? (
            <Text className="flex-1 text-black text-base self-center bg-gray-200 p-2 mt-2 rounded-xl text-center">
              {isCategoryLoading ? `Unit ${loadingText}` : 'No Unit Found'}{' '}
            </Text>
          ) : (
            <DropDownComp
              data={dropdownUnit}
              isFocus={isUnitFocus}
              value={selectedUnit}
              setValue={value => inputDispatch(setSelectedUnit(value))}
              setIsFocus={value => inputDispatch(setIsUnitFocus(value))}
              title={'Select Unit'}
            />
          )}
        </View>
      </VisibleComp>
      <ButtonComp
        title={'SAVE'}
        backgroundColor={color.primary}
        textClassName={'py-1'}
        containerStyle={{marginTop: 10}}
        onPress={() => {
          if (isEditing) {
            performEditFood();
            return;
          }
          performSaveFood();
        }}
      />
      <SpcaerComp height={10} />
      {isEmpty(foodList) && (
        <View
          style={{
            height: 240,
            justifyContent: 'center',
          }}>
          <Text className="text-gray-300 text-3xl font-medium self-center ">
            NO FOOD FOUND
          </Text>
        </View>
      )}
      {!isEmpty(foodList) && (
        <Text className="text-black text-sm ml-2">Food List </Text>
      )}
      <View className="flex-col-reverse">
        {foodList &&
          foodList.map((props, index) => (
            <ItemActionComp
              key={index}
              item={props}
              ondelete={() => {
                inputDispatch(chnageDeleteModalShow());
                inputDispatch(setFoodId(props._id.toString()));

                // performDeleteFood(props._id)
              }}
              onEdit={() => {
                inputDispatch(setFoodName(props.name));
                inputDispatch(setFoodPrice(props.price.toString()));
                inputDispatch(setFoodCGST(props.cgst.toString()));
                inputDispatch(setFoodSGST(props.sgst.toString()));
                inputDispatch(setFoodId(props._id.toString()));
                const categoryId = dropdownCategory.filter(
                  item => item.label == props.category,
                );
                const unitId = dropdownUnit.filter(
                  item => item.label == props.unit,
                );
                if (categoryId?.length != 0) {
                  inputDispatch(setSelectedCategory(categoryId[0].value));
                }
                if (unitId?.length != 0) {
                  inputDispatch(setSelectedUnit(unitId[0].value));
                }
                inputDispatch(changeIsEditing(true));
              }}
            />
          ))}
      </View>
      {/* Delete DialLog */}
      <DeleteAlert
        isVisible={isDeleModalShowing}
        message={
          foodState.orderList?.length > 0
            ? 'This Action will clear your order List'
            : 'This action cannot be undone.'
        }
        onCancel={() => {
          inputDispatch(chnageDeleteModalShow());
        }}
        onDelete={() => {
          performDeleteFood(foodId);
        }}
      />
      <SpcaerComp height={20} />
    </ScrollView>
  );
};

export default FoodScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: gray[200],
  },
  dropdown: {
    marginTop: 10,
    height: 40,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: colors.gray[200],
  },

  placeholderStyle: {
    fontSize: 16,
    color: colors.black,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
