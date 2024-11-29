import { StatusBar, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import SettingsLink from '../components/SettingsLink'
import LogOutButton from '../components/LogOutButton'
import ProfileCard from '../components/ProfileCard'

const Settings = () => {
    return (
        <ScrollView style={styles.container}>
            <View>
                <ProfileCard />
                <View>
                    <SettingsLink iconName={"account"} name="Account" href="/account" />
                    <SettingsLink iconName={"message-star"} name="My Reviews" href="/upload" />
                    <SettingsLink iconName={"heart"} name="Liked Reviews" href="/upvoted" />
                    <SettingsLink iconName={"hexagon-multiple"} name="Interests" href="/profile" />
                    <SettingsLink iconName={"chart-arc"} name="Data and Storage" href="/data" />
                    <SettingsLink iconName={"lock"} name="Privacy and Security" href="/product" />
                    <SettingsLink iconName={"bell-ring"} name="Notifications" href="/review" />
                    <SettingsLink iconName={"translate"} name="Language" href="/(auth)/login" />
                    <SettingsLink iconName={"information"} name="About" href="/about" />
                    <LogOutButton />
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 15,
        marginTop: StatusBar.currentHeight,
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

export default Settings;