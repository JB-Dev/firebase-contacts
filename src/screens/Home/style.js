import { StyleSheet } from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  syncIcon: {
    height: verticalScale(30),
    width: horizontalScale(30),
  },
  headerView: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingEnd: horizontalScale(30),
    paddingStart: horizontalScale(15),
    justifyContent: 'space-between',
  },
  textTotalContacts: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
  emptyContainer: {
    flex: 1,
  },
  flatListContainer: {},
  emptyView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
