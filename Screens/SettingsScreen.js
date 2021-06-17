import React from 'react'
import {View} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {switchMode} from '../redux/features/darkModeSlice'
import {Switch, Text, Button} from 'react-native-elements';
import {SimpleLineIcons} from "@expo/vector-icons";
import {auth} from "../firebase";
import {TouchableOpacity} from 'react-native-gesture-handler'


const SettingsScreen = ({navigation}) => {
    const isDark = useSelector((state) => state.darkMode.isDark)
    const dispatch = useDispatch()

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };
    return (
        <View style={{flex: 1, backgroundColor: isDark ? "#272121" : "#fff"}}>
            <Button
                buttonStyle={{
                    backgroundColor: isDark ? "#4F3112" : "#fb9327",
                }}
                onPress={() => dispatch(switchMode())}
                icon={
                    <Switch value={isDark} color="black" onValueChange={() => dispatch(switchMode())}/>
                }
                iconRight
                title="DarkMode"
            />

            <TouchableOpacity onPress={signOutUser} activeOpacity={0.5} pressMagnification={0.5}>
                <Button
                    buttonStyle={{
                        backgroundColor: isDark ? "#4F3112" : "#fb9327",
                    }}
                    onPress={() => dispatch(switchMode())}
                    icon={
                        <SimpleLineIcons name='logout' size={24} color='black'/>
                    }
                    iconRight
                    title="Logout"
                />
            </TouchableOpacity>
        </View>
    )
}
export default SettingsScreen
