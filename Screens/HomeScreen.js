import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { auth } from "../firebase"
import CustomSearchBar from '../components/CustomSearchBar'
import { useSelector } from 'react-redux'
import { selectAll } from '../redux/features/articlesSlice'
import ArticleRowItem from '../components/ArticleRowItem'

const HomeScreen = ({ navigation }) => {

    const isDark = useSelector((state) => state.darkMode.isDark)

    const articles = useSelector(selectAll)

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
    }
})
