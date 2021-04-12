import React, { useState } from 'react'
import { SearchBar } from 'react-native-elements'
import { StyleSheet, View, SafeAreaView, Text } from 'react-native'

const CustomSearchBar = ({ search, setSearch }) => {

    const getMoviesFromApiAsync = async (search) => {
        try {
            let response = await fetch(
                'https://reactnative.dev/movies.json'
            );
            let json = await response.json();
            return json.movies;
        } catch (error) {
            console.error(error);
        }

    };
    return (
        <SearchBar
            placeholder="Type Here..."
            placeholderTextColor='#fff'
            onChangeText={(text) => setSearch(text)}
            value={search}
            round
            showLoading
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
            onSubmitEditing={() => console.log(`User typed $}` + { search })}

        />
    )
}

export default CustomSearchBar

const styles = StyleSheet.create({})
