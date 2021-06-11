import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { countryList } from '../lib/countries.js'
import { ListItem, Avatar } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native';

const CountriesScreen = () => {
    const [countryselected, setCountryselected] = useState()


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {countryList.map((selectedItem, id) => (
                    <TouchableOpacity>
                        <View style={{ flex: 1, backgroundColor: "orange" }} >
                            <ListItem key={id} bottomDivider>

                                <Avatar source={{
                                    uri: selectedItem.flag_url
                                }}
                                    rounded
                                    size="medium"
                                />

                                <ListItem.Content>
                                    <ListItem.Title >{selectedItem.fullname}</ListItem.Title>
                                </ListItem.Content>



                            </ListItem>

                        </View>
                    </TouchableOpacity>
                ))}

            </ScrollView>
        </SafeAreaView>
    )
}

export default CountriesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',

    },
})
