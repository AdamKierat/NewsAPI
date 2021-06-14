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

    const isDark = useSelector((state) => state.darkMode.isDark)
    const dispatch = useDispatch()

    const articles = useSelector(selectAll)


    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    return (

        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#120f0f" : "#fff" }]}>
            <CustomSearchBar>
            </CustomSearchBar>


            <ScrollView>
                {articles != null && (
                    articles.map((selectedItem, index) => (
                        <ArticleRowItem article={selectedItem} onPress={() => navigation.navigate('Article', { article: selectedItem })}
                            index={index} />
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
        // backgroundColor: isDark ? "#fb9327" : "black"
    }
})
