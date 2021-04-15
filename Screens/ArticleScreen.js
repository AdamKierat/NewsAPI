import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Image } from 'react-native-elements'
const ArticleScreen = ({ route, navigation }) => {
    const { article, otherParam } = route.params;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <View>
            <Image source={{
                uri: article.urlToImage
            }}
                style={{ width: windowWidth, height: 400 }} />

            <Text style={{ fontSize: 20 }}>{article.content}</Text>
        </View>
    )
}

export default ArticleScreen

const styles = StyleSheet.create({})
