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
                    <SettingsLink iconName={"account"} name="Account" href="/screens/account" />
                    <SettingsLink iconName={"message-star"} name="My Reviews" href="/screens/upload" />
                    <SettingsLink iconName={"heart"} name="Liked Reviews" href="/screens/upvoted" />
                    <SettingsLink iconName={"hexagon-multiple"} name="Interests" href="/screens/profile" />
                    <SettingsLink iconName={"chart-arc"} name="Data and Storage" href="/screens/data" />
                    <SettingsLink iconName={"lock"} name="Privacy and Security" href="/screens/product" />
                    <SettingsLink iconName={"bell-ring"} name="Notifications" href="/screens/review" />
                    <SettingsLink iconName={"translate"} name="Language" href="/screens/data" />
                    <SettingsLink iconName={"information"} name="About" href="/screens/about" />
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