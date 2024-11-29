import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from '../components/ThemedText'
import SearchBar from '../components/SearchBar'
import ThemedInput from '../components/ThemedInput'

const ProductSelect = () => {
  return (
    <View style={styles.container}>
        <View>
            <ThemedText type='subtitle'>What would like to review?</ThemedText>
        </View>
        <ThemedInput name='Search for products' multiline={false}  />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        padding: 15
    },

})

export default ProductSelect;