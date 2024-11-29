import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { ThemedText } from './ThemedText';
const ReviewActions = () => {
    return (
        <View style={styles.container}>
            <View style={styles.pillsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Icon name="thumb-up-outline" size={26} style={styles.icon} color='#ffffff' />
                    <ThemedText style={styles.buttonText}>Upvote this Review</ThemedText>
                </TouchableOpacity>
            </View>

            <View style={styles.pillsContainer}>
                <TouchableOpacity style={styles.pill}>
                    <Icon name="share-variant-outline" size={26} style={styles.icon} color='#1f82f3' />
                    <ThemedText>Share</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pill}>
                    <Icon name="flag-outline" size={26} style={styles.icon} color='#fcce00' />
                    <ThemedText>Report</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {},
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff6600',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
    },
    pillsContainer: {   
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100,
        paddingHorizontal: 12,
        paddingVertical: 7
    },
    icon: {
        marginEnd: 5
    },
})

export default ReviewActions;