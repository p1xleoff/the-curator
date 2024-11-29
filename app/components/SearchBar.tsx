import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { ThemedText } from './ThemedText'

const SearchBar = () => {
    return (
        <View style={styles.container}>
            <Link href='/screens/search' style={styles.searchContainer}>
                <ThemedText style={styles.searchText}>Search for products and reviews</ThemedText>
            </Link>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
    },
    searchContainer: {
        backgroundColor: '#e0e0e0',
        borderRadius: 25,
        padding: 15,
        elevation: 5,
        marginBottom: 20
    },
    searchText: {
        fontWeight: '600',
        color: '#464646'
    }
})

export default SearchBar;