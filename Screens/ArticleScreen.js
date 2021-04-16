import React from 'react'
import { StyleSheet, Text, View, Dimensions, Linking } from 'react-native'
import { Image } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

const ArticleScreen = ({ route, navigation }) => {
    const { article, otherParam } = route.params;
    const windowWidth = Dimensions.get('window').width;
    const loadInBrowser = () => {
        Linking.openURL(article.url)
            .catch(err => console.error("Couldn't load page", err));
    };


    return (
        <View>
            <ScrollView>
                <Image source={{
                    uri: article.urlToImage
                }}
                    style={{ width: windowWidth, height: 400 }} onPress={loadInBrowser} />
                <Text style={{ fontSize: 18 }} >{article.title}</Text>
                <Text style={{ fontSize: 18 }} >{article.publishedAt}</Text>
                <Text style={{ fontSize: 18 }} >{article.author}</Text>
                <Text style={{ fontSize: 24 }} >{article.content}</Text>
            </ScrollView></View>
    )
}
export default ArticleScreen

const styles = StyleSheet.create({})
