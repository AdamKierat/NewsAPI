import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native-elements'
import { format } from "date-fns";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from 'react-redux'

export default function ArticleRowItem({ article, onPress, index }) {

    const isDark = useSelector((state) => state.darkMode.isDark)
    const dispatch = useDispatch()
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: isDark ? "#272121" : "#E9E9E9" }]} onPress={onPress} key={index}>
            <Image source={{
                uri: article.urlToImage
            }}
                borderRadius={5}
                style={[styles.image]} />
            <View style={styles.descriptionContainer}>
                <Text numberOfLines={5} style={[styles.dateText, { color: isDark ? "#fff" : "#686868" }]}>{article.title}</Text>
                <View style={styles.dateContainer}>
                    <MaterialCommunityIcons name="clock-time-four-outline" color={isDark ? "#fff" : "#686868"} size={19} />
                    <Text style={[styles.dateText, { color: isDark ? "#fff" : "#686868" }]}>{format(new Date(article.publishedAt), "MMM d, yyyy")}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'row', margin: 10, borderRadius: 1 },
    image: { height: 110, width: 210, resizeMode: 'cover' },
    descriptionContainer: { margin: 8, flexShrink: 1 },
    descriptionText: { fontSize: 13, fontWeight: 'normal', color: "black", textAlign: 'left', margin: 1, marginTop: 8 },
    dateContainer: { flexDirection: 'row', position: 'absolute', bottom: 1 },
    dateText: { marginLeft: 5 }
})