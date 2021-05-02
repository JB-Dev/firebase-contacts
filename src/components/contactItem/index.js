import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import style from './style';

const PhoneNumberView = ({ data }) => {
  return (
    <View style={style.phoneNumberContainer}>
      <Text style={style.phoneNumberLabel}>{`${data.label}`}</Text>
      <Text style={style.descriptionStyle}>{`${data.number}`}</Text>
    </View>
  );
};

const ContactItem = ({ item }) => {
  return (
    <View style={style.itemContainer}>
      <View style={style.mainTitleContainer}>
        <Text style={style.titleStyle}>{`${item.displayName}`}</Text>
        {item.phoneNumbers.length > 0 &&
          item.phoneNumbers.map((value, index) => (
            <PhoneNumberView data={value} key={index} />
          ))}
      </View>
    </View>
  );
};

ContactItem.propTypes = {
  item: PropTypes.object,
};
PhoneNumberView.propTypes = {
  data: PropTypes.object,
};

export default ContactItem;
