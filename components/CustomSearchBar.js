import React, { useState } from 'react'
import { SearchBar } from 'react-native-elements'
import { StyleSheet, View, SafeAreaView, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { selectAll, fetchByKeyword } from '../redux/features/articlesSlice'
import { API_KEY } from '@env'

const CustomSearchBar = () => {

    const [keyword, setKeyword] = useState("Apple");
    const dispatch = useDispatch()
    const articles = useSelector(selectAll)
    const articlesStatus = useSelector(state => state.articles.status)


    const fetchArticles = async () => {
        console.info(keyword)
        console.info(articlesStatus)
        if (articlesStatus === 'IDLE' || articlesStatus === 'SUCCEEDED') {

            dispatch(fetchByKeyword(keyword))
            console.info(articlesStatus)
        }

    };
    return (

        <SearchBar
            placeholder="Type Here..."
            placeholderTextColor='#fff'
            onChangeText={(text) => setKeyword(text)}
            value={keyword}
            round
            showLoading

            searchIcon={{ color: "#fff" }}
            clearIcon={{ color: "#fff" }}
            containerStyle={{
                backgroundColor: "#fb9327",
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent'
            }
            }
            inputContainerStyle={{
                backgroundColor: "#f0a150"
            }}
            inputStyle={{ color: '#fff' }}
            onSubmitEditing={fetchArticles}

        />

    )
}

export default CustomSearchBar

const styles = StyleSheet.create({})
