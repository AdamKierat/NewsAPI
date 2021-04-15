import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { auth, db } from "../firebase"
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import CustomSearchBar from '../components/CustomSearchBar'
import { StatusBar } from 'react-native'
import SearchResult from '../components/SearchResult'


const HomeScreen = ({ navigation }) => {

    const [search, setSearch] = useState("Apple");
    const [itemList, setItemList] = useState();


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
            <SearchResult itemList={itemList} />

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
})
