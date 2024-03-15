import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useReducer} from 'react';
import InputComp from '../../Components/InputComp';
import ButtonComp from '../../Components/ButtonComp';
import colors from 'tailwindcss/colors';
import ItemActionComp from '../../Components/ItemActionComp';
import SpcaerComp from '../../Components/SpcaerComp';
import {ListStore} from '../../App Context/ListsContext';
import foodInputReducers, {
  initialState,
} from '../../reducers/foodInputReducers';
import {
  handleDeleteUnit,
  handleEditUnit,
  handleSaveNewUnit,
} from '../../api/api clints/handleUnit';
import {
  removeFromUnitList,
  addNewUnit,
  updateUnitList,
} from '../../actions/listActions';
import {useToast} from 'react-native-toast-notifications';
import {
  changeIsEditing,
  chnageDeleteModalShow,
  clearAllField,
  setSelectedUnit,
  setUnit,
} from '../../actions/foodInputAction';
import {AppStore} from '../../App Context/AppContext';
import {isEmpty} from '../../utils/isEmpty';
import DeleteAlert from '../../Components/DeleteAlertComp';

const UnitScreen = ({navigation}) => {
  const toast = useToast();
  const {token, setLoading, sessionOutReq} = useContext(AppStore);
  const {state, dispatch} = useContext(ListStore);
  const {unitList} = state;
  const [inputState, inputDispatch] = useReducer(
    foodInputReducers,
    initialState,
  );
  const {unit, selectedUnit, isEditing, isDeleModalShowing} = inputState;

  // handle change Editing Mode
  useEffect(() => {
    if (!isEditing) {
      inputDispatch(clearAllField());
    }
    const unsubscribe = navigation.addListener('focus', e => {
      inputDispatch(changeIsEditing(false));
    });

    return unsubscribe;
  }, [isEditing, navigation]);

  async function performSaveUnit() {
    if (!unit) {
      return toast.show('please fill unit filed', {
        type: 'warning',
      });
    }
    setLoading(true);
    const response = await handleSaveNewUnit(token, {
      unitName: unit,
    });

    if (!response.success) {
      setLoading(false);
      if (response.status == 401) {
        return sessionOutReq();
      }
      return toast.show(response.message, {type: 'warning'});
    }

    // createdCategory
    if (response.success) {
      const id = response.message.newUnit._id;
      const name = response.message.newUnit.name;
      dispatch(addNewUnit({_id: id, name: name}));
      toast.show('unit add successfully', {
        type: 'success',
      });
      inputDispatch(setUnit(''));
      setLoading(false);
    }
  }

  async function performDeleteUnit(unitId) {
    try {
      if (!unitId) {
        return toast.show('Unit ID Not Found');
      }
      setLoading(true);
      const response = await handleDeleteUnit(token, {unitId});

      if (!response.success) {
        setLoading(false);
        if (response.status == 401) {
          return sessionOutReq();
        }
        toast.show(response.message, {type: 'warning'});

        return;
      }
      dispatch(removeFromUnitList(unitId));
      toast.show('Unit Deleted successFully', {type: 'success'});
      inputDispatch(setSelectedUnit(''));
      inputDispatch(chnageDeleteModalShow());
      setLoading(false);
    } catch (error) {
      inputDispatch(setSelectedUnit(''));
      inputDispatch(chnageDeleteModalShow());
      toast.show('some error occur', {
        type: 'danger',
      });
    }
  }

  async function performEditUnit() {
    if (!unit) {
      return toast.show('please fill unit filed', {
        type: 'warning',
      });
    }
    if (!selectedUnit) {
      return toast.show('unit id not found', {
        type: 'warning',
      });
    }

    setLoading(true);
    const response = await handleEditUnit(token, {
      unitName: unit,
      unitId: selectedUnit,
    });

    if (!response.success) {
      setLoading(false);

      if (response.status == 401) {
        return sessionOutReq();
      }
      toast.show(response.message, {
        type: 'danger',
      });
      return;
    }

    dispatch(updateUnitList(response.message.unit, selectedUnit));
    toast.show('Unit edited successfully', {type: 'success'});
    inputDispatch(setUnit(''));
    inputDispatch(changeIsEditing(false));
    setLoading(false);
  }
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      className="bg-slate-100 flex-1 p-2">
      {/* title */}
      <InputComp
        placeholder={'Enter Unit Name'}
        title={'New Unit'}
        mainStyle={'h-10'}
        value={unit}
        onChangeText={value => inputDispatch(setUnit(value))}
      />
      <ButtonComp
        title={'SAVE'}
        backgroundColor={colors.indigo[500]}
        textClassName={'py-1'}
        containerStyle={{marginTop: 10}}
        onPress={() => {
          if (isEditing) {
            performEditUnit();
            return;
          }
          performSaveUnit();
        }}
      />
      <SpcaerComp height={10} />
      {isEmpty(unitList) && (
        <View
          style={{
            height: 400,
            justifyContent: 'center',
          }}>
          <Text className="text-gray-300 text-3xl font-medium self-center ">
            NO UNIT FOUND
          </Text>
        </View>
      )}
      {!isEmpty(unitList) && (
        <Text className="text-black text-sm ml-2">Unit List </Text>
      )}
      {unitList &&
        unitList.map((props, index) => (
          <ItemActionComp
            key={index}
            item={props}
            ondelete={() => {
              inputDispatch(setSelectedUnit(props._id));
              inputDispatch(chnageDeleteModalShow());

              //  performDeleteUnit(props._id)
            }}
            onEdit={() => {
              inputDispatch(setUnit(props.name));
              inputDispatch(setSelectedUnit(props._id));
              inputDispatch(changeIsEditing(true));
            }}
          />
        ))}

      {/* Delete DialLog */}
      <DeleteAlert
        isVisible={isDeleModalShowing}
        onCancel={() => {
          inputDispatch(chnageDeleteModalShow());
        }}
        onDelete={() => {
          performDeleteUnit(selectedUnit);
        }}
      />
    </ScrollView>
  );
};

export default UnitScreen;

const styles = StyleSheet.create({});
