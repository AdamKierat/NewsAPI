import React, {useEffect, useLayoutEffect, useState} from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import {Button, Image, Input} from 'react-native-elements'
import {auth} from '../firebase'

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const singIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert((error)))
    }

    useEffect(() => {
        return auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('BottomTab')
            }
        });
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {backgroundColor: "#fb9327"},
            title: 'Login',
        })
    }, [navigation])

    return (

        <SafeAreaView style={styles.container}>

            <Image source={{
                uri: "https://cdn.pixabay.com/photo/2018/10/26/09/24/news-3774160_1280.png"
            }}
                   style={{width: 180, height: 180}}/>
            <View style={styles.inputContainer}>

                <Input
                    placeholder="E-mail"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}/>

                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={singIn}
                />

                <Button
                    onPress={singIn}
                    buttonStyle={{backgroundColor: "#fb9327"}}
                    containerStyle={styles.button}
                    title="Login"/>

                <Button
                    onPress={() => navigation.navigate('Register')}
                    titleStyle={{color: "#fcbb39"}}
                    buttonStyle={{borderColor: "#fb9327"}}
                    containerStyle={styles.button}
                    type="outline"
                    title="Register"
                />

            </View>
            <View style={{height: 10}}/>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#fff",
    },
    inputContainer: {
        width: 300,
        alignItems: "center"
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
