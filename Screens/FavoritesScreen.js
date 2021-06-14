import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'


const FavoritesScreen = ({ navigation }) => {
    const isDark = useSelector((state) => state.darkMode.isDark)
    return (
        <View style={{ flex: 1, backgroundColor: isDark ? "#272121" : "#fff" }}>
            <Text>FavoritesScreen</Text>
        </View>
    )
}

export default FavoritesScreen

const styles = StyleSheet.create({})
