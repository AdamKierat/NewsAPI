import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useSelector } from 'react-redux'

const FiltersScreen = ({ navigation }) => {

    const isDark = useSelector((state) => state.darkMode.isDark)
    return (
        <View style={[styles.container, { backgroundColor: isDark ? "#272121" : "#fff" }]}>
            <Text style={[styles.title, { color: isDark ? "#fff" : "#272121" }]}>
                Filter articles by:
            </Text>
            <Button
                title="Countries"
                buttonStyle={[styles.button, { backgroundColor: isDark ? "#4F3112" : "#fb9327" }]}
                onPress={() => navigation.navigate('Countries')} />
            <Button
                title="Categories"
                buttonStyle={[styles.button, { backgroundColor: isDark ? "#4F3112" : "#fb9327" }]}
                onPress={() => navigation.navigate('Categories')} />
        </View>
    )
}

export default FiltersScreen

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,
        padding: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        paddingBottom: 20,
    },
})
