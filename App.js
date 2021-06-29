import React from 'react';
import {Provider} from 'react-redux'
import store from './redux/store'
import { LogBox } from 'react-native';
import LayoutContainer from './screens/LayoutContainer';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
    return (
        <Provider store={store}>
            <LayoutContainer/>
        </Provider>
    );
}
