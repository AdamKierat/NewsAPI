import React from 'react'
import { StyleSheet, Text, View, Dimensions, Linking } from 'react-native'
import { Image } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';
import { format } from "date-fns";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from 'react-redux'

const ArticleScreen = ({ route, navigation }) => {
    const { article, otherParam } = route.params;
    const isDark = useSelector((state) => state.darkMode.isDark)

    const loadInBrowser = () => {
        Linking.openURL(article.url)
            .catch(err => console.error("Couldn't load page", err));
    };


    return (
        <View style={[styles.container, { backgroundColor: isDark ? "#272121" : "#fff" }]}>
            <ScrollView>
                <Image source={{
                    uri: article.urlToImage
                }}
                    style={styles.image} onPress={loadInBrowser} />
                <Text style={[styles.titleText, { color: isDark ? "#fff" : "#272121" }]} >{article.title}</Text>
                <Divider orientation="horizontal" height={2} color={'black'} margin={5} marginTop={20} marginBottom={20} />
                <Text style={[styles.contentText, { color: isDark ? "#fff" : "black" }]}>{article.content}</Text>
                <Text style={styles.linkText} onPress={loadInBrowser} >Read more...</Text>
                <Divider orientation="horizontal" height={1} color={'black'} margin={5} marginTop={10} marginBottom={10} />
                <Text style={[styles.authorText, { color: isDark ? "#fff" : "#686868" }]} >{article.author}</Text>
                <View style={styles.dateContainer}>
                    <MaterialCommunityIcons name="clock-time-four-outline" color={isDark ? "#fff" : "#686868"} size={19} />
                    <Text style={[styles.dateText, { color: isDark ? "#fff" : "#686868" }]}>{format(new Date(article.publishedAt), "MMM d, yyyy")}</Text>
                </View>
                <Divider orientation="horizontal" height={1} color={'black'} margin={5} marginTop={10} marginBottom={10} />
            </ScrollView></View>
    )
}
export default ArticleScreen
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'column', },
    image: { width: windowWidth, height: 250, resizeMode: 'cover' },
    titleText: { fontSize: 20, fontWeight: 'bold', textAlign: 'left', margin: 1, marginTop: 10 },
    contentText: { fontSize: 19, fontWeight: 'normal', color: "black", textAlign: 'left', margin: 1 },
    dateText: { fontSize: 19, marginLeft: 5 },
    linkText: { fontSize: 19, fontWeight: 'bold', marginLeft: 5, color: "blue" },
    authorText: { fontSize: 20, marginLeft: 5, alignSelf: 'center' },
    dateContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
})
