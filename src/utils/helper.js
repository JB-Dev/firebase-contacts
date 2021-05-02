import { Toast } from 'native-base';
import { getUniqueId } from 'react-native-device-info';
import { moderateScale } from '../styles';
import colors from '../styles/colors';

export const getDeviceId = () => {
  let uniqueId = getUniqueId();

  return uniqueId;
};

export const showToast = (message) => {
  Toast.show({
    text: `${message}`,
    textStyle: {
      color: colors.white,
      fontSize: moderateScale(16),
    },
    duration: 2000,
  });
};
