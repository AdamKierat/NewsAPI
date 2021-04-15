import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { auth, db } from "../firebase"
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import CustomSearchBar from '../components/CustomSearchBar'
import { StatusBar } from 'react-native'



const HomeScreen = ({ navigation }) => {

    const [search, setSearch] = useState("Apple");
    const [itemList, setItemList] = useState();



    const list = [
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },]

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem bottomDivider>
            <Avatar source={{ uri: item.avatar_url }} />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )

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

            <ScrollView>
                {itemList != null && (
                    itemList.articles.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar source={{
                                uri: l.urlToImage
                            }} />
                            <ListItem.Content>
                                <ListItem.Title>{l.title}</ListItem.Title>
                                <ListItem.Subtitle>{l.description}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                )}
            </ScrollView>





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
