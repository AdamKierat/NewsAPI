import React, { useState } from 'react'
import { SearchBar } from 'react-native-elements'
import { StyleSheet, View, SafeAreaView, Text } from 'react-native'
import { API_KEY } from '../utils/constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CustomSearchBar = ({ search, setSearch, setItemList }) => {

    const getMoviesFromApiAsync = async () => {

        try {
            let response = await fetch(
                'https://newsapi.org/v2/everything?q=' + search + '&sortBy=popularity&apiKey=' + API_KEY
            );

            let json = await response.json();
            setItemList(json);
            return json.movies;
        } catch (error) {
            console.error(error);
        }

    };
    return (
        <TouchableOpacity>
            <SearchBar
                placeholder="Type Here..."
                placeholderTextColor='#fff'
                onChangeText={(text) => setSearch(text)}
                value={search}
                round
                showLoading
                setSearch={getMoviesFromApiAsync}
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
                onSubmitEditing={getMoviesFromApiAsync}

            />
        </TouchableOpacity>
    )
}

export default CustomSearchBar

const styles = StyleSheet.create({})
