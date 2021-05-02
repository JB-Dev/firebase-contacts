import { Root } from 'native-base';
import React from 'react';
import { LoadingView } from './src/components';
import Home from './src/screens/Home';

const App = () => {
  return (
    <Root>
      <Home />
      <LoadingView />
    </Root>
  );
};

export default App;
