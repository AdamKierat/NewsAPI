import React, { useState } from "react";
import {StyleSheet, SafeAreaView, View, Picker, Text} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import CustomSearchBar from '../components/CustomSearchBar'
import {useSelector, useDispatch} from 'react-redux'
import {selectAll, filterArticles, clearFilter} from '../redux/features/articlesSlice'
import ArticleRowItem from '../components/ArticleRowItem'
import {Button} from 'react-native-elements'

const HomeScreen = ({navigation}) => {
    const isDark = useSelector((state) => state.darkMode.isDark)
    const articles = useSelector(selectAll);
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState("today");

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: isDark ? "#120f0f" : "#fff"}]}>
            <CustomSearchBar>
            </CustomSearchBar>
            <View style={styles.sortContainer}>
                <Text> Sort by: </Text>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Today" value="today" />
                    <Picker.Item label="This week" value="week" />
                    <Picker.Item label="This month" value="month" />
                </Picker>
                <Button
                    title="Filter"
                    buttonStyle={[styles.button, { backgroundColor: isDark ? "#4F3112" : "#fb9327" }]}
                    onPress={() => dispatch(filterArticles(selectedValue))}
                />
                <Button
                    title="X"
                    buttonStyle={[styles.button, { backgroundColor: isDark ? "#4F3112" : "#fb9327" }]}
                    onPress={() => dispatch(clearFilter())}
                />
            </View>
            <ScrollView>
                {articles != null && (
                        articles.map((selectedItem, index) => (
                            <ArticleRowItem article={selectedItem}
                                            onPress={() => navigation.navigate('Article', {article: selectedItem})}
                                            index={index}/>
                        ))
                )}
            </ScrollView>
        </SafeAreaView>
    )
}
export default HomeScreen

const styles = StyleSheet.create({
    button: {
        width: 100,
        marginTop: 10,
        padding: 10,
    },
    container: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        paddingBottom: 20,
    },
    sortContainer: {
        padding: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
})
