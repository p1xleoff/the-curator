import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const Data = () => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>

                <View style={styles.card}>
                    <Text style={styles.title}>Delete Games Collection</Text>
                    <Text style={styles.text}>This action will permanantly delete all your games from the app and clear the online cloud storage. There will be no way to restore it.</Text>
                    <Text style={styles.text}>All the games you added will be lost forever.</Text>
                    <TouchableOpacity style={styles.links} >
                        <Text style={styles.linkText}>Delete Everything</Text>
                        <MaterialCommunityIcons name="delete-outline" color='tomato' size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Clear Cache</Text>
                    <Text style={styles.text}>
                        The app size may become too big if the cache is not cleared.
                    </Text>
                    <Text style={styles.text}>
                        Go to Storage & Cache and tap Clear Cache to clear the app cache.
                    </Text>
                    <TouchableOpacity style={styles.links} >
                        <Text style={styles.linkText}>Clear Cache</Text>
                        <MaterialCommunityIcons name="database-remove-outline" color='tomato' size={24} />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        marginHorizontal: "3%",
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 15
    },
    card: {
        elevation: 10,
        padding: 15,
        borderRadius: 3,
        marginVertical: 10,
        backgroundColor: '#ffffff'
    },
    links: {
        flexDirection: 'row',
        elevation: 10,
        padding: 10,
        borderRadius: 3,
        justifyContent: 'space-between',
        marginVertical: 10,
        backgroundColor: '#080808',
        alignItems: 'center',
    },
    linkText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffffff'
    }
})

export default Data;

