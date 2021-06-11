import React from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import {categoryList} from '../lib/categories.js'
import {ListItem} from 'react-native-elements'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useDispatch, useSelector} from 'react-redux'
import {fetchByCategory, selectAll} from '../redux/features/articlesSlice'

const CategoriesScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const articles = useSelector(selectAll)
    const articlesStatus = useSelector(state => state.articles.status)

    const fetchArticles = async (category) => {
        console.log(category)
        if (articlesStatus === 'IDLE' || articlesStatus === 'SUCCEEDED') {
            dispatch(fetchByCategory(category))
        }
        navigation.replace('BottomTab')
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {categoryList.map((selectedItem, id) => (
                    <TouchableOpacity
                        style={styles.tile}
                        onPress={() => fetchArticles(selectedItem.category_name)}
                    >
                        <View style={{flex: 1, backgroundColor: "orange"}}>
                            <ListItem key={id} bottomDivider>
                            <MaterialCommunityIcons name={selectedItem.logo_name} size={24} color='black'/>
                                <ListItem.Content>
                                    <ListItem.Title>{selectedItem.category_name}</ListItem.Title>
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
