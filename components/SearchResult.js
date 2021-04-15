import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, ListItem, Image } from 'react-native-elements'
import { SafeAreaView } from 'react-native'



const SearchResult = ({ itemList }) => {


    return (
        <ScrollView>
            {itemList != null && (
                itemList.articles.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                            <TouchableOpacity >
                                <Image source={{
                                    uri: l.urlToImage
                                }}
                                    style={{ width: 100, height: 100 }} />

                                <ListItem.Content>
                                    <ListItem.Title>{l.title}</ListItem.Title>
                                    <ListItem.Subtitle>{l.description}</ListItem.Subtitle>
                                </ListItem.Content>
                            </TouchableOpacity>
                        </View>
                    </ListItem>

                ))
            )}
        </ScrollView>


    )
}

export default SearchResult

const styles = StyleSheet.create({})
