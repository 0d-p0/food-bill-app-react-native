import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';

const emailIcon = ({size, color}) => {
  return <MaterialCommunityIcons name="email" color={color} size={size} />;
};

const eyeIcon = ({size, color}) => {
  return <MaterialCommunityIcons name="eye" color={color} size={size} />;
};

const eyeOffIcon = ({size, color}) => {
  return <MaterialCommunityIcons name="eye-off" color={color} size={size} />;
};

const arrowDownIcon = ({size, color}) => {
  return <MaterialIcons name="keyboard-arrow-down" color={color} size={size} />;
};

const arrowUpIcon = ({size, color}) => {
  return <MaterialIcons name="keyboard-arrow-up" color={color} size={size} />;
};

const backIcon = ({size, color}) => {
  return <MaterialIcons name="arrow-back-ios-new" color={color} size={size} />;
};

const removeIcon = ({size, color}) => {
  return <Ionicons name="remove-circle-sharp" color={color} size={size} />;
};

const addIcon = ({size, color, style}) => {
  return <Ionicons name="add-circle" color={color} size={size} />;
};

const deleteIcon = ({size, color}) => {
  return <MaterialCommunityIcons name="delete" color={color} size={size} />;
};

const editIcon = ({size, color}) => {
  return <MaterialIcons name="edit" color={color} size={size} />;
};

const homeOutLineIcon = ({color, size}) => (
  <MaterialCommunityIcons name="home-outline" color={color} size={size} />
);

const foodOutLineIcon = ({color, size}) => (
  <MaterialCommunityIcons name="food-outline" color={color} size={size} />
);
const flagOutLineIcon = ({color, size}) => (
  <MaterialCommunityIcons name="flag-outline" color={color} size={size} />
);

const ProfileIcon = ({color, size}) => (
  <AntDesign name="profile" color={color} size={size} />
);

const logoutIcon = ({color, size}) => (
  <MaterialIcons name="logout" color={color} size={size} />
);

const doneIcon = ({color, size}) => (
  <MaterialIcons name="done" color={color} size={size} />
);

const refreshIcon = ({color, size}) => (
  <MaterialIcons name="refresh" color={color} size={size} />
);

const repeatIcon = ({color, size}) => (
  <FontAwesome name="repeat" color={color} size={size} />
);

const calendarIcon = ({color, size}) => (
  <AntDesign name="calendar" color={color} size={size} />
);

const newsPaperIcon = ({color, size}) => (
  <Ionicons name="newspaper-outline" color={color} size={size} />
);

const settingsOutlineIcon = ({color, size}) => (
  <Ionicons name="settings-outline" color={color} size={size} />
);

const arrowRightIcon = ({color, size}) => (
  <Ionicons name="arrow-forward" color={color} size={size} />
);

const passwordIcon = ({color, size}) => (
  <MaterialIcons name="password" color={color} size={size} />
);

const paintIcon = ({color, size}) => (
  <MaterialIcons name="format-paint" color={color} size={size} />
);

const offlineIcon = ({color, size}) => (
  <Ionicons name="cloud-offline-outline" color={color} size={size} />
);

export const Icons = {
  emailIcon,
  eyeIcon,
  eyeOffIcon,
  arrowDownIcon,
  arrowUpIcon,
  removeIcon,
  addIcon,
  deleteIcon,
  editIcon,
  homeOutLineIcon,
  foodOutLineIcon,
  flagOutLineIcon,
  ProfileIcon,
  logoutIcon,
  doneIcon,
  backIcon,
  refreshIcon,
  repeatIcon,
  calendarIcon,
  newsPaperIcon,
  settingsOutlineIcon,
  arrowRightIcon,
  passwordIcon,
  paintIcon,
  offlineIcon,
};
