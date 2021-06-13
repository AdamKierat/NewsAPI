import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { switchMode } from './../redux/features/darkModeSlice'
import { Switch, Text, Button } from 'react-native-elements';
import { SimpleLineIcons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { TouchableOpacity } from 'react-native-gesture-handler'



const SettingsScreen = ({ navigation }) => {
    const isDark = useSelector((state) => state.darkMode.isDark)
    const dispatch = useDispatch()

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };
    return (
        <View>
            <Button
                buttonStyle={{
                    backgroundColor: "#fb9327",
                }}
                onPress={() => dispatch(switchMode())}
                icon={
                    <Switch value={isDark} color="black" onValueChange={() => dispatch(switchMode())} />
                }
                iconRight
                title="DarkMode"
            />

            <TouchableOpacity onPress={signOutUser} activeOpacity={0.5} pressMagnification={0.5}>
                <Button
                    buttonStyle={{
                        backgroundColor: "#fb9327",
                    }}
                    onPress={() => dispatch(switchMode())}
                    icon={
                        <SimpleLineIcons name='logout' size={24} color='black'></SimpleLineIcons>
                    }
                    iconRight
                    title="Logout"
                />
            </TouchableOpacity>
            <Text>{"jest ciemno? " + isDark}</Text>
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({})
