import React, {useEffect, useState} from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {useSelector} from 'react-redux'
import ArticleRowItem from '../components/ArticleRowItem'
import firebase from "../firebase";


const FavoritesScreen = ({navigation}) => {
    const isDark = useSelector((state) => state.darkMode.isDark)

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        return firebase.db.collection('articles').onSnapshot(snapshot => (
            setArticles(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ));
    }, [])

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: isDark ? "#120f0f" : "#fff"}]}>
            <ScrollView>
                {articles != null && (
                    articles.map(({data, id}) => (
                        <ArticleRowItem article={data} onPress={() => navigation.navigate('Article', {article: data})}
                                        index={id}/>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default FavoritesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
