import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ArticleScreen from './screens/ArticleScreen'
import CountriesScreen from './screens/CountriesScreen'
import FavoritesScreen from './screens/FavoritesScreen';
import BottomTabNavigator from './screens/BottomTabNavigator';
import { Provider } from 'react-redux'
import store from './redux/store'
import SettingsScreen from './screens/SettingsScreen';
import FiltersScreen from './screens/FiltersScreen';
import CategoriesScreen from './screens/CategoriesScreen';

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
          <Stack.Screen name='Settings' component={SettingsScreen} />
          <Stack.Screen name='Favorites' component={FavoritesScreen} />
          <Stack.Screen name='Filters' component={FiltersScreen} />
          <Stack.Screen name='Article' component={ArticleScreen} />
          <Stack.Screen name='Countries' component={CountriesScreen} />
          <Stack.Screen name='BottomTab' component={BottomTabNavigator} />
          <Stack.Screen name='Categories' component={CategoriesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
