import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'

export type UploadProps = {
    title: string;
    onPress: () => void;
}

const UploadButton = ({title, onPress}: UploadProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <ThemedText type='defaultSemiBold'>{title}</ThemedText>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff7300',
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5   ,
        alignItems: 'center',
        flex: 1
    },
})

export default UploadButton;