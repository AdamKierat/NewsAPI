import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ArticleScreen from './screens/ArticleScreen'
import SearchResult from './components/SearchResult'
import CountriesScreen from './screens/CountriesScreen'
import { Provider } from 'react-redux'
import store from './redux/store'

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#fb9327" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
}


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={globalScreenOptions}>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Article' component={ArticleScreen} />
          <Stack.Screen name='Search' component={SearchResult} />
          <Stack.Screen name='Countries' component={CountriesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
