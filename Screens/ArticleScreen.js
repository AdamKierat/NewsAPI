import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {Dimensions, Linking, StyleSheet, Text, View} from 'react-native'
import {Divider, Image} from 'react-native-elements'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {format} from "date-fns";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useSelector} from 'react-redux'
import firebase from "../firebase";
import {selectAll} from '../redux/features/articlesSlice'
import ArticleRowItem from '../components/ArticleRowItem'

const ArticleScreen = ({route, navigation}) => {
    console.ignoredYellowBox = ['Setting a timer'];
    const similarSize = 5;
    const {article} = route.params;
    const isDark = useSelector((state) => state.darkMode.isDark)
    const articles = useSelector(selectAll)
    const [iconColor, seticonColor] = useState("white");

    const id_ = article.url.slice(8).replace(/\//g, '_')
    const articleDB = firebase.db.collection("articles").doc(id_);

    const addFavArticle = useCallback(async () => {
        const doc = await articleDB.get()

        if (doc.exists) {
            seticonColor('white')
            try {
                await articleDB.delete();
            } catch (error) {
                console.log(error);
            }
        } else {
            seticonColor('red')
            try {
                await articleDB.set(article);
            } catch (error) {
                console.log(error);
            }
        }
    }, [])

    useEffect(() => {
        const fetchDoc = async () => {
            const doc = await articleDB.get()
            if (doc.exists) {
                seticonColor('red')
            } else {
                seticonColor('white')
            }
        }

        fetchDoc()
    }, [navigation])

    const loadInBrowser = () => {
        Linking.openURL(article.url)
            .catch(err => console.error("Couldn't load page", err));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 50,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => addFavArticle()}
                        activeOpacity={0.5}
                        pressMagnification={0.5}
                    >
                        <MaterialCommunityIcons
                            name="cards-heart"
                            size={30}
                            color={iconColor}
                        />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, iconColor]);

    return (
        <View style={[styles.container, {backgroundColor: isDark ? "#272121" : "#fff"}]}>
            <ScrollView>
                <Image source={{
                    uri: article.urlToImage
                }}
                       style={styles.image} onPress={loadInBrowser}/>
                <Text style={[styles.titleText, {color: isDark ? "#fff" : "#272121"}]}>{article.title}</Text>
                <Divider orientation="horizontal" height={2} color={'black'} margin={5} marginTop={20}
                         marginBottom={20}/>
                <Text style={[styles.contentText, {color: isDark ? "#fff" : "black"}]}>{article.content}</Text>
                <Text style={styles.linkText} onPress={loadInBrowser}>Read more...</Text>
                <Divider orientation="horizontal" height={1} color={'black'} margin={5} marginTop={10}
                         marginBottom={10}/>
                <Text style={[styles.authorText, {color: isDark ? "#fff" : "#686868"}]}>{article.author}</Text>
                <View style={styles.dateContainer}>
                    <MaterialCommunityIcons name="clock-time-four-outline" color={isDark ? "#fff" : "#686868"}
                                            size={19}/>
                    <Text
                        style={[styles.dateText, {color: isDark ? "#fff" : "#686868"}]}>{format(new Date(article.publishedAt), "MMM d, yyyy")}</Text>
                </View>
                <Divider orientation="horizontal" height={1} color={'black'} margin={5} marginTop={10}
                         marginBottom={10}/>
                <View style={styles.similarContainer}>
                    <Text
                        style={[styles.dateText, {color: isDark ? "#fff" : "#686868"}]}>
                        similar news
                    </Text>
                    <ScrollView>
                        {articles != null && (
                            articles.slice(-(similarSize)).map((selectedItem, index) => {
                                if (selectedItem !== article) {
                                    return (
                                        <ArticleRowItem article={selectedItem}
                                                        onPress={() => navigation.navigate('Article', {article: selectedItem})}
                                                        index={index}/>
                                    )
                                }
                            })
                        )}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}
export default ArticleScreen
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {flex: 1, flexDirection: 'column',},
    image: {width: windowWidth, height: 250, resizeMode: 'cover'},
    titleText: {fontSize: 20, fontWeight: 'bold', textAlign: 'left', margin: 1, marginTop: 10},
    contentText: {fontSize: 19, fontWeight: 'normal', color: "black", textAlign: 'left', margin: 1},
    dateText: {fontSize: 19, marginLeft: 5},
    linkText: {fontSize: 19, fontWeight: 'bold', marginLeft: 5, color: "blue"},
    authorText: {fontSize: 20, marginLeft: 5, alignSelf: 'center'},
    dateContainer: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
    similarText: {fontSize: 19, fontWeight: 'bold', textAlign: 'center', margin: 1},
    similarContainer: {} //{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
})
