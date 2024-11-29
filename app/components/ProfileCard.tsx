import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import auth from "@react-native-firebase/auth"

const ProfileCard = () => {
    const user = auth().currentUser;
    return (
        <View style={styles.container}>
            <View style={styles.profileCard}>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://picsum.photos/80/80',
                    }}
                />
                <View>
                    <Text style={styles.title}>{user.displayName}</Text>
                    <Text style={styles.userStatText}>{user.displayName}</Text>
                </View>
            </View>

            <View style={styles.userStats}>
                <Text style={styles.userStatText}>11 Reviews</Text>
                <Text style={styles.userStatText}>11 Upvotes</Text>
                <Text style={styles.userStatText}>Nov 2024</Text>
            </View>
        </View>
    )
}

export default ProfileCard

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    profileCard: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 75,
        marginEnd: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    userStats: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-evenly'
    },
    userStatText: {
        fontWeight: '600',
        fontSize: 16,
        marginEnd: 20
    },
    userStatNum: {
        fontSize: 22,
        fontWeight: 'bold',
    },
})