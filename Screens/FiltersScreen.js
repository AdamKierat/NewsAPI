import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Button} from 'react-native-elements'

const FiltersScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Filter articles by:
            </Text>
            <Button
                title="Countries"
                buttonStyle={styles.button}
                onPress={() => navigation.navigate('Countries')}/>
            <Button
                title="Categories"
                buttonStyle={styles.button}
                onPress={() => navigation.navigate('Categories')}/>
        </View>
    )
}

export default FiltersScreen

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10,
        padding: 10,
        backgroundColor: "#fb9327"
    },
    container: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        paddingBottom: 20,
    },
})
