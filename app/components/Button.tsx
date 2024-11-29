import { StyleSheet, Text, TouchableOpacity, View, type ViewProps } from 'react-native'
import React from 'react'

export type ButtonProps = ViewProps & {
  title: string | React.ReactElement;
  onPress?: () => void;
}

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#ff8800',
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})