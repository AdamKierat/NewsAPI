import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { ListItem, Image } from 'react-native-elements'

export default function ArticleRowItem({ article, onPress, windowHeight, windowWidth }) {
    return (
        <TouchableOpacity style={styles.containerStyle} onPress={onPress}>
            <Image source={{
                uri: article.urlToImage
            }}
                borderRadius={5}
                style={[styles.imageStyle]} />
            <View style={styles.descriptionContainerStyle}>
                <Text numberOfLines={5} style={styles.descriptionTextStyle}>{article.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerStyle: { flex: 1, flexDirection: 'row', margin: 10, backgroundColor: '#E5E5E5', borderRadius: 1 },
    imageStyle: { height: 120, width: 220, resizeMode: 'cover' },
    descriptionContainerStyle: { margin: 2, flexShrink: 1 },
    descriptionTextStyle: { fontSize: 12, fontWeight: '500', color: "black", fontFamily: "sans-serif", textAlign: 'left', margin: 15, marginTop: 20 }
})