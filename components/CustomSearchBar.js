import React, { useState } from 'react'
import { SearchBar } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchByKeyword, selectAll } from '../redux/features/articlesSlice'


const CustomSearchBar = () => {

    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch()
    const articlesStatus = useSelector(state => state.articles.status)
    const isDark = useSelector((state) => state.darkMode.isDark)

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
                backgroundColor: isDark ? "#4F3112" : "#fb9327",
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent'
            }
            }
            inputContainerStyle={{
                backgroundColor: isDark ? "#6C4C2A" : "#f0a150"
            }}
            inputStyle={{ color: '#fff' }}
            onSubmitEditing={fetchArticles}

        />

    )
}

export default CustomSearchBar

const styles = StyleSheet.create({})
