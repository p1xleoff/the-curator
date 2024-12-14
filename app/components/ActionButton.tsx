import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';

export type ActionProps = {
    iconName: any;
}

const ActionButton = ({ iconName }: ActionProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Link href='/screens/upload'>
                    <Icon name={iconName} size={36} color={'#fff'} />
                </Link>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        right: 15,
    },
    button: {
        borderRadius: 50,
        padding: 15,
        backgroundColor: '#292929',
        elevation: 5,
    }
})

export default ActionButton;