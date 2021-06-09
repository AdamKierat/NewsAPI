import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native-elements'
import { format } from "date-fns";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function ArticleRowItem({ article, onPress, windowHeight, windowWidth }) {


    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{
                uri: article.urlToImage
            }}
                borderRadius={5}
                style={[styles.image]} />
            <View style={styles.descriptionContainer}>
                <Text numberOfLines={5} style={styles.descriptionText}>{article.title}</Text>
                <View style={styles.dateContainer}>
                    <MaterialCommunityIcons name="clock-time-four-outline" color={"#585858"} size={19} />
                    <Text style={styles.dateText}>{format(new Date(article.publishedAt), "MMM d, yyyy")}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'row', margin: 10, backgroundColor: '#E9E9E9', borderRadius: 1 },
    image: { height: 110, width: 210, resizeMode: 'cover' },
    descriptionContainer: { margin: 8, flexShrink: 1 },
    descriptionText: { fontSize: 13, fontWeight: 'normal', color: "black", textAlign: 'left', margin: 1, marginTop: 8 },
    dateContainer: { flexDirection: 'row', position: 'absolute', bottom: 1 },
    dateText: { marginLeft: 5, color: "#686868" }
})