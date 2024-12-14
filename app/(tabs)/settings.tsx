import { StatusBar, StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import SettingsLink from '../components/SettingsLink'
import LogOutButton from '../components/LogOutButton'
import { ThemedView } from '../components/ThemedView'
import auth from "@react-native-firebase/auth";
import { ThemedText } from '../components/ThemedText'
import Avatar from '../components/Avatar'

const Settings = () => {
    const user = auth().currentUser;
    return (
        <ThemedView style={styles.container}>
            <ScrollView>
                <View style={styles.profileCard}>
                <Avatar size={60} />
                    <ThemedText type="title" style={{marginLeft: 20}}>{user.displayName}</ThemedText>
                </View>
                <View>
                    <SettingsLink iconName={"account-settings"} name="Account" href="/screens/account" />
                    <SettingsLink iconName={"account"} name="My Profile" href={{pathname: "/screens/profile/[userId]", params: { userId: user.uid, userName: user.displayName }}} />
                    <SettingsLink iconName={"comment-plus"} name="Add Review" href="/screens/upload" />
                    <SettingsLink iconName={"text-box"} name="My Reviews" href="/(tabs)/userReviews" />
                    <SettingsLink iconName={"chart-arc"} name="Data and Storage" href="/screens/data" />
                    {/* <SettingsLink iconName={"lock"} name="Privacy and Security" href="/screens/data" /> */}
                    {/* <SettingsLink iconName={"bell-ring"} name="Notifications" href="/screens/privacy" /> */}
                    {/* <SettingsLink iconName={"translate"} name="Language" href="/screens/data" /> */}
                    <SettingsLink iconName={"information"} name="About" href="/screens/about" />
                    <LogOutButton />
                </View>
            </ScrollView>
        </ThemedView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: StatusBar.currentHeight,
    },
    profileCard: {
        flexDirection: 'row',
        marginVertical: 20,
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