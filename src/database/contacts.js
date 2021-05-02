import database from '@react-native-firebase/database';
import { loadingViewRef } from '../components/loadingView';
import Strings from '../lang/strings';
import { getDeviceId, showToast } from '../utils/helper';

export const addContacts = (contacts) => {
  const id = getDeviceId();

  database()
    .ref(`/contacts/${id}`)
    .set(contacts)
    .then(() => {
      loadingViewRef.current.hide();
      showToast(Strings.dataSyncSuccessfully);
    })
    .catch(() => {
      loadingViewRef.current.hide();
      showToast(Strings.somethingWantWrong);
    });
};
