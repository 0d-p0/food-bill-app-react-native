import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useReducer, useState} from 'react';
import InputComp from '../../Components/InputComp';
import ButtonComp from '../../Components/ButtonComp';
import colors from 'tailwindcss/colors';
import ItemActionComp from '../../Components/ItemActionComp';
import SpcaerComp from '../../Components/SpcaerComp';
import ListContext, {ListStore} from '../../App Context/ListsContext';
import foodInputReducers, {
  initialState,
} from '../../reducers/foodInputReducers';
import {
  changeIsEditing,
  chnageDeleteModalShow,
  clearAllField,
  setCategory,
} from '../../actions/foodInputAction';
import {useToast} from 'react-native-toast-notifications';
import {
  handlEditCategory,
  handleDeleteCategory,
  handleSaveNewCategory,
} from '../../api/api clints/handleCategory';
import {AppStore} from '../../App Context/AppContext';
import {
  removeFromCateGoryList,
  addNewCategory,
  updateCategoryList,
} from '../../actions/listActions';
import {setSelectedCategory} from '../../actions/foodActions';
import {isEmpty} from '../../utils/isEmpty';
import {removeItemValue} from '../../utils/AsyncStorage/asyncOperation';
import DeleteAlert from '../../Components/DeleteAlertComp';

const CategoryScreen = ({route, navigation}) => {
  const toast = useToast();
  const {token, setLoading, setIsLogin, sessionOutReq} = useContext(AppStore);
  const {state, dispatch} = useContext(ListStore);
  const {categoryList} = state;

  const [inputState, inputDispatch] = useReducer(
    foodInputReducers,
    initialState,
  );

  const {category, selectedCategory, isEditing, isDeleModalShowing} =
    inputState;
  // handle change Editing Mode
  useEffect(() => {
    if (!isEditing) {
      inputDispatch(clearAllField());
    }
  }, [isEditing]);

  async function performSaveCategory() {
    if (!category) {
      return toast.show('please fill category filed', {
        type: 'warning',
      });
    }
    setLoading(true);
    const response = await handleSaveNewCategory(token, {
      categoryName: category,
    });

    if (!response.success) {
      setLoading(false);
      if (response.status == 401) {
        return sessionOutReq();
      }
      return toast.show(response.message, {type: 'warning'});
    }

    const id = response.message.createdCategory._id;
    const name = response.message.createdCategory.name;
    dispatch(addNewCategory({_id: id, name: name}));
    inputDispatch(setCategory(''));
    toast.show('category add successfully', {
      type: 'success',
    });
    setLoading(false);
  }

  async function performDeleteCategory(categoryId) {
    try {
      if (!categoryId) {
        return toast.show('Category ID Not Found');
      }
      setLoading(true);
      const response = await handleDeleteCategory(token, {categoryId});

      if (!response.success) {
        setLoading(false);
        if (response.status == 401) {
          setLoading(false);
          return sessionOutReq();
        }
        return toast.show(response.message, {type: 'warning'});
      }
      dispatch(removeFromCateGoryList(categoryId));
      toast.show('Category Deleted successFully', {type: 'success'});
      inputDispatch(chnageDeleteModalShow());
      inputDispatch(setSelectedCategory(''));
      setLoading(false);
    } catch (error) {
      inputDispatch(chnageDeleteModalShow());
      inputDispatch(setSelectedCategory(''));
      toast.show('some error occur', {
        type: 'danger',
      });
    }
  }

  async function performEditCategory() {
    if (!category) {
      return toast.show('please fill category filed', {
        type: 'warning',
      });
    }
    if (!selectedCategory) {
      return toast.show('category id not found', {
        type: 'warning',
      });
    }

    setLoading(true);
    const response = await handlEditCategory(token, {
      categoryName: category,
      categoryId: selectedCategory,
    });

    if (!response.success) {
      setLoading(false);
      inputDispatch(chnageDeleteModalShow());
      if (response.status == 401) {
        return sessionOutReq();
      }
      return toast.show(response.message, {type: 'warning'});
    }

    dispatch(updateCategoryList(response.message.category, selectedCategory));
    toast.show('category edited successfully', {type: 'success'});
    inputDispatch(setCategory(''));
    inputDispatch(changeIsEditing(false));
    setLoading(false);
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      className="bg-slate-100 flex-1 p-2">
      {/* title */}
      <View>
        <InputComp
          placeholder={'Enter Category Name'}
          title={'New Category'}
          mainStyle={'h-10'}
          value={category}
          onChangeText={value => inputDispatch(setCategory(value))}
        />
        {isEditing && (
          <TouchableOpacity
            className="absolute top-3 right-3"
            onPress={() => inputDispatch(changeIsEditing(false))}>
            <Text className="text-red-500 text font-medium">Close Editing</Text>
          </TouchableOpacity>
        )}
      </View>
      <ButtonComp
        title={'SAVE'}
        backgroundColor={colors.indigo[500]}
        textClassName={'py-1'}
        containerStyle={{marginTop: 10}}
        onPress={() => {
          if (isEditing) {
            performEditCategory();
            return;
          }
          performSaveCategory();
        }}
      />
      <SpcaerComp height={10} />

      {isEmpty(categoryList) && (
        <View
          style={{
            height: 400,
            justifyContent: 'center',
          }}>
          <Text className="text-gray-300 text-3xl font-medium self-center ">
            NO CATEGORY FOUND
          </Text>
        </View>
      )}

      {!isEmpty(categoryList) && (
        <Text className="text-black text-sm ml-2">Category List </Text>
      )}
      {categoryList &&
        categoryList.map((props, index) => (
          <ItemActionComp
            key={index}
            item={props}
            ondelete={() => {
              inputDispatch(setSelectedCategory(props._id));
              inputDispatch(chnageDeleteModalShow());
            }}
            onEdit={() => {
              inputDispatch(setCategory(props.name));
              inputDispatch(setSelectedCategory(props._id));
              inputDispatch(changeIsEditing(true));
            }}
          />
        ))}

      <DeleteAlert
        isVisible={isDeleModalShowing}
        onCancel={() => {
          inputDispatch(chnageDeleteModalShow());
        }}
        onDelete={() => {
          performDeleteCategory(selectedCategory);
        }}
      />
    </ScrollView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
