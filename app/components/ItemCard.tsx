import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'
import { Link } from 'expo-router'

type Product = {
    name: string;
    // image: string;
    rating: number;
    category: string;
    reviewNum: number;
}

const data = [
    {
        name: 'Razer Viper Mini',
        category: 'Gaming Mouse',
        image: 'https://picsum.photos/300/200',
        rating: 4.5,
        reviewNum: 1200,
    },
]

const ItemCard = () => {

    const renderItem = ({ item }: { item: Product }) => {
        return (
            <Pressable >
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://picsum.photos/300/200',
                    }}
                />
                <Link href='/screens/product'>
                    <View style={styles.itemInfo}>
                        <ThemedText style={styles.text}>{item.name}</ThemedText>
                        <ThemedText style={[styles.text, { fontSize: 16, fontWeight: '500' }]}>{item.category}</ThemedText>
                        <ThemedText style={[styles.text, { fontSize: 16, fontWeight: '500' }]}>{item.rating} ({item.reviewNum})</ThemedText>
                    </View>
                </Link>
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={data}
                renderItem={renderItem}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: '#e4e4e4',
    },
    image: {
        width: 'auto',
        height: 200,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    itemInfo: {
        padding: 10,
        color: 'black'
    },
    text: {
        color: 'black',
        fontWeight: '600',
        fontSize: 20,
    },
})

export default ItemCard;