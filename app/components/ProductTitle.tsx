import { StyleSheet, View, type ViewProps } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'

export type ProductTitleProps = ViewProps & {
    name: string;
    category: string;
}

const ProductTitle = ({ name, category }: ProductTitleProps) => {
    return (
        <View style={styles.container}>
            <ThemedText style={styles.name}>{name}</ThemedText>
            <ThemedText style={styles.category}>{category}</ThemedText>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingBottom: 10
    },
    name: {
        fontSize: 34,
        fontWeight: '700',
        paddingTop: 20,
    },
    category: {
        fontSize: 12,
        fontWeight: '600',
    },
})

export default ProductTitle;