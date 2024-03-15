import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import SpcaerComp from '../../Components/SpcaerComp';
import {Icons} from '../../res/icons/icons';
import colors from 'tailwindcss/colors';
import SinglReportComp from '../../Components/SinglReportComp';
import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';
import CalenderComp from '../../Components/CalenderComp';
import {handleGetBill} from '../../api/api clints/handleBill';
import {AppStore} from '../../App Context/AppContext';
import {Toast} from 'react-native-toast-notifications';
import {ListStore} from '../../App Context/ListsContext';
import {setReportList} from '../../actions/listActions';
import ButtonComp from '../../Components/ButtonComp';
import {isEmpty} from '../../utils/isEmpty';

const ReportScreen = ({navigation}) => {
  const {token, setLoading, sessionOutReq} = useContext(AppStore);
  const {state, dispatch} = useContext(ListStore);
  const {reportList} = state;
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const [showDate, setShowDate] = useState(null);
  const [isButtonShow, setButtonShow] = useState(false);

  async function perFromGetBill() {
    try {
      if (new Date(fromDate).getTime() > new Date(toDate).getTime()) {
        Toast.show(
          `Please Pick Proper Date\n From date can't be bigger than to date`,
          {
            type: 'warning',
          },
        );
        return;
      }
      setLoading(true);
      setButtonShow(false);
      const response = await handleGetBill(token, fromDate, toDate);
      if (!response.success) {
        setLoading(false);
        if (response.status == 401) {
          return sessionOutReq();
        }
        Toast.show(`😵‍💫 ${response.message} 😵‍💫`, {type: 'danger'});
        return;
      }
      dispatch(setReportList(response.message.data));
      setLoading(false);
      if (response?.message?.data?.length == 0) {
        Toast.show('😥 No Bill Found 😥', {type: 'success'});
        return;
      }

      Toast.show('👍👍Bill Fetch Successfully 👍👍', {type: 'success'});
    } catch (error) {
      console.log(error);
      Toast.show('😵‍💫 some Error occur 😵‍💫', {
        type: 'danger',
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    perFromGetBill();
  }, []);

  useEffect(() => {
    setButtonShow(true);
  }, [fromDate, toDate]);

  return (
    <View className="bg-indigo-500 flex-1">
      <Text className="text-white text-xl p-4 text-center">Report</Text>
      <View className="bg-white flex-1 rounded-t-3xl p-5">
        {/* Date Container */}
        <View className="flex-row justify-between px-8 ">
          <Text className="text-gray-700 text-base font-normal">From Date</Text>
          <Text className="text-gray-700 text-base font-normal">To Date</Text>
        </View>
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={() => setShowDate(true)}
            className="rounded-2xl border-green-500 border-2 p-2  w-[42%] flex-row justify-evenly ">
            <Icons.calendarIcon size={25} color={colors.green[500]} />
            <Text className="text-black text-base text-center font-medium">
              {new Date(fromDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          <View className="p-2">
            <Icons.repeatIcon color={colors.green[500]} size={30} />
          </View>
          <TouchableOpacity
            onPress={() => setShowDate(false)}
            className="rounded-2xl border-green-500 border-2 p-2 w-[42%] flex-row justify-evenly">
            <Icons.calendarIcon size={25} color={colors.green[500]} />
            <Text className="text-black text-base text-center font-medium">
              {new Date(toDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>
        <SpcaerComp height={20} />
        {/* Report  List Container */}

        {isEmpty(reportList) && (
          <View className="items-center justify-center h-4/5">
            <Text className="text-gray-300 text-3xl font-medium self-center ">
              NO BILL FOUND
            </Text>
          </View>
        )}
        <ScrollView>
          {reportList &&
            reportList.map((props, index) => (
              <SinglReportComp
                key={index}
                item={props}
                onPress={() =>
                  navigation.navigate('reportDetails', {details: props})
                }
              />
            ))}
        </ScrollView>

        {isButtonShow && (
          <View>
            <ButtonComp
              containerStyle={{marginTop: 0, marginBottom: -10}}
              backgroundColor={colors.green[600]}
              title={'Genarte Bill'}
              onPress={perFromGetBill}
            />
          </View>
        )}
      </View>

      {/* From Date Modal */}
      <Modal visible={showDate} animationType="fade" transparent={true}>
        <View
          style={{
            backgroundColor: colors.gray[50],
            position: 'absolute',
            top: '25%',
            paddingBottom: 10,
          }}>
          <CalenderComp
            date={fromDate}
            onChange={params => {
              setFromDate(params.date);
              setShowDate(null);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setShowDate(null);
            }}
            className="bg-indigo-500 px-5 py-2  rounded-2xl self-end">
            <Text className="text-white font-normal text-base text-center">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* To Date Modal */}
      <Modal
        visible={!showDate && showDate !== null}
        animationType="fade"
        transparent={true}>
        <View
          style={{
            backgroundColor: colors.gray[50],
            position: 'absolute',
            top: '25%',
            paddingBottom: 10,
          }}>
          <CalenderComp
            date={toDate}
            onChange={params => {
              setToDate(params.date);
              setShowDate(null);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setShowDate(null);
            }}
            className="bg-indigo-500 px-5 py-2  rounded-2xl self-end">
            <Text className="text-white font-normal text-base text-center">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ReportScreen;
