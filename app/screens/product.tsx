import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductTitle from '../components/ProductTitle'
import Rating from '../components/Rating'
import { ThemedText } from '../components/ThemedText'
import ItemCard from '../components/ItemCard'

const Product = () => {
    return (
        <ScrollView style={styles.container}>
            <ProductTitle name='Logitech G102' category='Smartphones' />
            <Rating />
            <ThemedText style={styles.heading}>Reviews</ThemedText>
            <ItemCard />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },
    heading: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10
    }
})

export default Product;