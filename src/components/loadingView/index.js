import React, { createRef, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { Colors } from '../../styles';
import style from './style';

export const loadingViewRef = createRef();

const LoadingView = () => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(
    loadingViewRef,
    () => ({
      show: () => setIsVisible(true),
      hide: () => setIsVisible(false),
    }),
    [],
  );

  return (
    <Modal
      transparent
      animated
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}>
      <View style={[style.container]}>
        <ActivityIndicator size="large" color={Colors.black} />
      </View>
    </Modal>
  );
};

export default LoadingView;
