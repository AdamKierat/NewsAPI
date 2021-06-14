import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'


const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageURL, setImageURL] = useState("");

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    photoURL: imageURL ||
                        "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
                })
            })
            .catch(error => alert(error.message));

    };

    return (
        <SafeAreaView behavior="padding" style={styles.container}>

            <Text h3 style={{ marginBottom: 50 }}>Create NewsAPI account</Text>
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

                <Input
                    placeholder="Profile picture URL (optional)"
                    type="text"
                    value={imageURL}
                    onChangeText={(text) => setImageURL(text)}
                    onSubmitEditing={register}
                />


            </View>
            <Button
                containerStyle={styles.button}
                buttonStyle={{ backgroundColor: "#fb9327" }}
                raised
                onPress={register}
                title="Register" />

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
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
