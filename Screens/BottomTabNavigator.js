import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HomeScreen from "./HomeScreen"
import SettingsScreen from "./SettingsScreen"
import FavoritesScreen from "./FavoritesScreen"
import { View } from "react-native";
import { auth } from "../firebase";
import FiltersScreen from "./FiltersScreen";
import { useSelector, useDispatch } from 'react-redux'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {

    const isDark = useSelector((state) => state.darkMode.isDark)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "NewsAPP",
            headerTitleStyle: { color: isDark ? "#fff" : "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 15 }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 40,
                }}>
                </View>
            )
        })
    }, [navigation, isDark])

    return (
        <Tab.Navigator
            initialRouteName="BottomTab"
            activeColor="#fb9327"
            inactiveColor="#fb9327"
            style={{ backgroundColor: "#fb9327" }}
            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: 'lightgray',
                activeBackgroundColor: isDark ? "#4F3112" : "#fb9327",
                inactiveBackgroundColor: isDark ? "#4F3112" : "#fb9327",
                keyboardHidesTabBar: true
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={30}
                        />
                    ),
                }}
            >
                {(props) => (<HomeScreen
                    {...props}
                    navigation={navigation}
                />)}
            </Tab.Screen>
            <Tab.Screen
                name="Filters"
                options={{
                    tabBarLabel: "Filters",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="view-list-outline" color={color} size={30} />
                    ),
                }}
            >
                {(props) => (<FiltersScreen
                    {...props}
                    navigation={navigation}
                />)}
            </Tab.Screen>
            <Tab.Screen
                name="Favorites"
                options={{
                    tabBarLabel: "Favorites",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="heart" color={color} size={30} />
                    ),
                }}
            >
                {(props) => (<FavoritesScreen
                    {...props}
                    navigation={navigation}
                />)}
            </Tab.Screen>
            <Tab.Screen
                name="Settings"
                options={{
                    activeTintColor: '#81B247',
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cog" color={color} size={30} />
                    ),
                }}
            >
                {(props) => (<SettingsScreen
                    {...props}
                    navigation={navigation}
                />)}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
