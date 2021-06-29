import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import LayoutContainer from './screens/LayoutContainer';



export default function App() {
  return (
    <Provider store={store}>
      <LayoutContainer></LayoutContainer>
    </Provider>
  );
}
