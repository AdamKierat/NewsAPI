import React, { useLayoutEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar, ListItem, Image } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import HomeScreen from "./HomeScreen"
import SettingsScreen from "./SettingsScreen"
import FavoritesScreen from "./FavoritesScreen"
import { View } from "react-native";
import { auth, db } from "../firebase";
import { SimpleLineIcons } from "@expo/vector-icons";
import FiltersScreen from "./FiltersScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "NewsAPI",
            headerTitleStyle: { color: "black", },
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
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5} pressMagnification={0.5}>
                        <SimpleLineIcons name='logout' size={24} color='black'></SimpleLineIcons>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])


    return (

        <Tab.Navigator
            initialRouteName="BottomTab"
            activeColor="#fb9327"
            inactiveColor="#fb9327"
            style={{ backgroundColor: "#fb9327" }}
            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: 'lightgray',
                activeBackgroundColor: "#fb9327",
                inactiveBackgroundColor: "#fb9327",
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
