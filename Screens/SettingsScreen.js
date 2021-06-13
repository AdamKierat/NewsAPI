import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { switchMode } from './../redux/features/darkModeSlice'

const SettingsScreen = () => {
    const isDark = useSelector((state) => state.darkMode.isDark)
    const dispatch = useDispatch()
    return (
        <View>
            <Text>SettingsScreen</Text>
            <Button
                onPress={() => dispatch(switchMode())}
                title="mode switch"
                color="#841584"
                accessibilityLabel="dupa"
            />
            <Text>{"jest ciemno? " + isDark}</Text>
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({})
