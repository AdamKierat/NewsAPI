import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import { Avatar, ListItem, Image } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { auth, db } from "../firebase"
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import CustomSearchBar from '../components/CustomSearchBar'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import LoginScreen from './LoginScreen'

const HomeScreen = ({ navigation }) => {

    const [search, setSearch] = useState("Apple");
    const [itemList, setItemList] = useState();
    const [articles, setArticles] = useState([]);

    const Tab = createMaterialBottomTabNavigator();

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "NewsAPI",
            headerTitleStyle: { color: "black" },
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
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <SimpleLineIcons name='logout' size={24} color='black'></SimpleLineIcons>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    return (

        <SafeAreaView style={styles.container}>
            <CustomSearchBar
                search={search}
                setSearch={setSearch}
                itemList={itemList}
                setItemList={setItemList} >
            </CustomSearchBar>


            <ScrollView contentContainerStyle={{ justifyContent: "center" }}>
                {itemList != null && (
                    itemList.articles.map((selectedItem, index) => (
                        <ListItem key={index} bottomDivider>
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('Article', { article: selectedItem })} >

                                    <Image source={{
                                        uri: selectedItem.urlToImage
                                    }}
                                        style={{ width: 100, height: 100 }} />

                                    <ListItem.Content>
                                        <ListItem.Title >{selectedItem.title}</ListItem.Title>
                                        <ListItem.Subtitle>{selectedItem.description}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </TouchableOpacity>
                            </View>
                        </ListItem>

                    ))
                )}
            </ScrollView>

        </SafeAreaView >



    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
})
