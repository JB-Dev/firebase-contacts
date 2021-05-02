import { firebase } from '@react-native-firebase/database';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Icons } from '../../assets/icons';
import { ContactItem } from '../../components';
import { loadingViewRef } from '../../components/loadingView';
import firebaseConfig from '../../config/firebaseConfig';
import { addContacts } from '../../database/contacts';
import Strings from '../../lang/strings';
import style from './style';

const requestForContactPermission = async (setContacts, setTotalContacts) => {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: Strings.contacts,
      message: Strings.thisAppWouldLikeToViewYourContacts,
      buttonPositive: Strings.pleaseAcceptBareMortal,
    }).then(() => {
      loadContacts(setContacts, setTotalContacts);
    });
  } else {
    loadContacts(setContacts, setTotalContacts);
  }
};

const loadContacts = (setContacts, setTotalContacts) => {
  Contacts.getAll()
    .then((contacts) => {
      loadingViewRef.current.hide();
      setContacts(contacts);
    })
    .catch((e) => {
      loadingViewRef.current.hide();
    });

  Contacts.getCount().then((count) => {
    setTotalContacts(count);
  });

  Contacts.checkPermission();
};

const handleSyncAction = (contacts) => {
  loadingViewRef.current.show();

  const contactsArray = makeArrayFromContacts(contacts);

  addContacts(contactsArray);
};

const makeArrayFromContacts = (contacts) => {
  let finalArray = [];

  contacts.forEach((element) => {
    let data = {};

    data.name = element.displayName;
    data.phone_numbers = element.phoneNumbers;
    finalArray.push(data);
  });

  return finalArray;
};

const HeaderView = ({ totalContacts, contacts }) => {
  return (
    <View style={style.headerView}>
      <Text
        style={
          style.textTotalContacts
        }>{`${totalContacts} contacts found`}</Text>
      <Pressable onPress={() => handleSyncAction(contacts)}>
        <Image source={Icons.sync} style={style.syncIcon} />
      </Pressable>
    </View>
  );
};

const EmptyView = () => (
  <View style={style.emptyView}>
    <Text>{Strings.noContactsFound}</Text>
  </View>
);

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [totalContacts, setTotalContacts] = useState(0);

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }

    loadingViewRef.current.show();
    requestForContactPermission(setContacts, setTotalContacts);
  }, []);

  return (
    <View style={[style.container, backgroundStyle]}>
      <SafeAreaView style={backgroundStyle} />
      <StatusBar barStyle={'light-content'} />
      <HeaderView totalContacts={totalContacts} contacts={contacts} />
      <FlatList
        scrollEnabled
        listKey={(item, index) => index.toString()}
        data={contacts}
        keyExtractor={({ id }, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          contacts.length > 0 ? style.flatListContainer : style.emptyContainer,
        ]}
        ListEmptyComponent={() => <EmptyView />}
        renderItem={({ item, index }) => (
          <ContactItem item={item} key={index} />
        )}
      />
    </View>
  );
};

HeaderView.propTypes = {
  totalContacts: PropTypes.number,
  contacts: PropTypes.array,
};

export default Home;
