import { StyleSheet } from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../styles';

export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
  },
  phoneNumberContainer: {
    marginTop: verticalScale(5),
    flexDirection: 'row',
  },
  phoneNumberLabel: {
    flex: 1,
    fontWeight: 'bold',
    marginEnd: horizontalScale(20),
  },
  mainTitleContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  titleStyle: {
    fontSize: moderateScale(18),
  },
  descriptionStyle: {
    flex: 2,
    fontSize: moderateScale(14),
    color: Colors.borderColor,
  },
});
