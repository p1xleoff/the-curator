import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AccountInfoCard from '../components/AccountInfo'

const Account = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profileCard}>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://picsum.photos/80/80',
                    }}
                />
                <View style={styles.profileCard}>
                    <Text style={styles.title}>p1xLe</Text>
                </View>
            </View>
            <View>
                <AccountInfoCard fullName='Peter Parker' phoneNum='9876543210' userName='p1xLe' email='p1xle@lol.com' />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    profileCard: {
        marginTop: 15,
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 75,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    userStats: {
        flexDirection: 'row',
    },
    userStatText: {
        fontWeight: '600',
        fontSize: 16,
    },
})

export default Account;