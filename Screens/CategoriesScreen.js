import React from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import {categoryList} from '../lib/categories.js'
import {ListItem} from 'react-native-elements'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useDispatch, useSelector} from 'react-redux'
import {fetchByCategory} from '../redux/features/articlesSlice'

const CategoriesScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const articlesStatus = useSelector(state => state.articles.status)
    const isDark = useSelector((state) => state.darkMode.isDark)

    const fetchArticles = async (category) => {
        if (articlesStatus === 'IDLE' || articlesStatus === 'SUCCEEDED') {
            dispatch(fetchByCategory(category))
        }
        navigation.replace('BottomTab')
    };

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: isDark ? "#272121" : "#fff"}]}>
            <ScrollView>
                {categoryList.map((selectedItem, id) => (
                    <TouchableOpacity
                        style={styles.tile}
                        onPress={() => fetchArticles(selectedItem.category_name)}
                        key={id}
                    >
                        <View style={{flex: 1}}>
                            <ListItem key={id} bottomDivider
                                      containerStyle={{backgroundColor: isDark ? "#4F3112" : "#fff"}}>
                                <MaterialCommunityIcons name={selectedItem.logo_name} size={24}
                                                        color={isDark ? "#fff" : "black"}/>
                                <ListItem.Content>
                                    <ListItem.Title
                                        style={{color: isDark ? "#fff" : "black"}}>{selectedItem.category_name}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    tile: {
        padding: 10,
    }
})
