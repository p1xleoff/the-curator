import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AboutLink from '../components/AboutLink'

const About = () => {
    return (
        <View style={styles.container}>
            <AboutLink title='Version' subtext='1.0' iconName={"cheese"} />
            <AboutLink title='Changelog' subtext='- Bugs + Features' iconName={"code-tags"} />
            <AboutLink title='Third Party Notices' subtext='Libraries and APIs' iconName={"file-document"} />
            <AboutLink title='Githib Repo' subtext='View Source Code' iconName={"github"} />
            <AboutLink title='License' subtext='MIT License' iconName={"license"} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
})

export default About;