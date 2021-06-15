import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import ArticleScreen from './ArticleScreen'
import CountriesScreen from './CountriesScreen'
import FavoritesScreen from './FavoritesScreen';
import BottomTabNavigator from './BottomTabNavigator';
import SettingsScreen from './SettingsScreen';
import FiltersScreen from './FiltersScreen';
import CategoriesScreen from './CategoriesScreen';
import { useSelector } from 'react-redux'

const Stack = createStackNavigator();

const LayoutContainer = () => {
    const isDark = useSelector((state) => state.darkMode.isDark)
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerStyle: { backgroundColor: isDark ? "#4F3112" : "#fb9327" },
                    headerTitleStyle: { color: "white" },
                    headerTintColor: "white",
                }}>
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
    )
}

export default LayoutContainer
