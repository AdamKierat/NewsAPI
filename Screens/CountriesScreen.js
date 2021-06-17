import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { countryList } from '../lib/countries.js'
import { Avatar, ListItem } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { fetchByCountry } from '../redux/features/articlesSlice'

const CountriesScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const articlesStatus = useSelector(state => state.articles.status)
    const isDark = useSelector((state) => state.darkMode.isDark)

    const fetchArticles = async (country) => {
        console.log(country)
        if (articlesStatus === 'IDLE' || articlesStatus === 'SUCCEEDED') {
            dispatch(fetchByCountry(country))
            console.info(articlesStatus)
        }
        navigation.replace('BottomTab')
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {countryList.map((selectedItem, id) => (
                    <TouchableOpacity onPress={() => fetchArticles(selectedItem.name)}>
                        <View style={{ flex: 1 }}>
                            <ListItem
                                key={id}
                                bottomDivider
                                containerStyle={{ backgroundColor: isDark ? "#272121" : "#fff" }}
                            >
                                <Avatar source={{
                                    uri: selectedItem.flag_url
                                }}
                                    rounded
                                    size="medium"
                                />

                                <ListItem.Content>
                                    <ListItem.Title style={{ color: isDark ? "#fff" : "black" }} >{selectedItem.fullname}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default CountriesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
})
