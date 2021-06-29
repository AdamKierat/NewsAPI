import React, {useLayoutEffect, useState} from 'react'
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Button, Input, Text} from 'react-native-elements'
import firebase, {auth} from '../firebase'
import * as ImagePicker from 'expo-image-picker';

const RegisterScreen = ({navigation}) => {
    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({localUri: pickerResult.uri});
    };


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedImage, setSelectedImage] = useState('assets/765-default-avatar.png');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {backgroundColor: "#fb9327"},
            title: 'Register',
        })
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                firebase.db.collection('profileImages').doc(email).set({image: selectedImage})
            })
            .then(() => {
                console.log("Image successfully written!");
            })
            .catch(error => alert(error.message));

    };

    return (
        <SafeAreaView behavior="padding" style={styles.container}>

            <Text h3 style={{marginBottom: 50}}>Create NewsAPI account</Text>
            <View style={styles.inputContainer}>

                <Input
                    placeholder="E-mail"
                    autoFocus
                    type="text"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />


            </View>
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.imageButton}>
                <Text style={styles.imageButtonText}>Profile picture (optional)</Text>
            </TouchableOpacity>
            <Button
                containerStyle={styles.button}
                buttonStyle={{backgroundColor: "#fb9327"}}
                raised
                onPress={register}
                title="Register"/>

        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#fff",
    },
    imageButton: {
        width: 250,
        height: 40,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: "grey",
        borderRadius: 50
    },
    imageButtonText: {
        textAlign: 'center',
        fontSize: 20
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
