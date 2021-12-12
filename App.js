import { StatusBar } from 'expo-status-bar';
import { Provider} from 'react-redux';
import store from './src/store/index'
import React from 'react';
import NavHoc from './src/navigators/NavHoc';


const statusBar = <StatusBar style="auto" />

export default function App() {
  
  return (
    <Provider
      store={store}
    >
      <NavHoc/>
    </Provider>
   
  );
}

