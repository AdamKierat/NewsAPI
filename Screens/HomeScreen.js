import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import { Avatar, ListItem, Image } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { auth, db } from "../firebase"
import CustomSearchBar from '../components/CustomSearchBar'
import { useSelector, useDispatch } from 'react-redux'
import { selectAll } from '../redux/features/articlesSlice'
import ArticleRowItem from '../components/ArticleRowItem'


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
                        <ArticleRowItem article={selectedItem} onPress={() => navigation.navigate('Article', { article: selectedItem })}
                            windowWidth={windowWidth} windowHeight={windowHeight} />
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
