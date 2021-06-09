import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import { Avatar, ListItem, Image } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { auth, db } from "../firebase"
import CustomSearchBar from '../components/CustomSearchBar'
import { useSelector, useDispatch } from 'react-redux'
import { selectAll } from '../redux/features/articlesSlice'
const HomeScreen = ({ navigation }) => {


    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const articles = useSelector(selectAll)


    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    return (

        <SafeAreaView style={styles.container}>
            <CustomSearchBar>
            </CustomSearchBar>


            <ScrollView>
                {articles != null && (
                    articles.map((selectedItem, index) => (
                        <ListItem key={index} style={{ flex: 1 }}>
                            <View style={{ flex: 1, margin: -16 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Article', { article: selectedItem })} >

                                    <Image source={{
                                        uri: selectedItem.urlToImage
                                    }}
                                        style={{ width: windowWidth, height: 230, marginBottom: -3 }} />
                                    <View style={{ backgroundColor: "#ff9933", height: 55 }}>
                                        <ListItem.Content>
                                            <ListItem.Title style={{ fontSize: 20, fontWeight: "bold", color: "black", textAlign: "center" }} >{selectedItem.title}</ListItem.Title>
                                            {/* <ListItem.Subtitle>{selectedItem.description}</ListItem.Subtitle> */}
                                        </ListItem.Content>
                                    </View>
                                </TouchableOpacity>
                            </View>
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
