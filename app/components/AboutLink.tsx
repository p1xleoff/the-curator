import { StyleSheet, Text, TouchableOpacity, View, type ViewProps } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export type AboutLinkProps = ViewProps & {
    title: string;
    subtext: string;
    iconName: any;
}

const AboutLink = ({ title, subtext, iconName }: AboutLinkProps) => {
    return (
        <View>
            <TouchableOpacity style={styles.card}>
                <Icon name={iconName} size={24} style={styles.icon} />
                <View>
                    <Text style={styles.superText}>{title}</Text>
                    <Text style={styles.subText}>{subtext}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        elevation: 5
    },
    superText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subText: {
        color: '#000000',
        fontSize: 16,
    },
    icon: {
        marginEnd: 20
    }
})

export default AboutLink;