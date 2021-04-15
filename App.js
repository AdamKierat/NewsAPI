import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ArticleScreen from './Screens/ArticleScreen'
import SearchResult from './components/SearchResult'

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#fb9327" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={globalScreenOptions}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Article' component={ArticleScreen} />
        <Stack.Screen name='Search' component={SearchResult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
