import { StyleSheet, Text, TouchableOpacity, View, type ViewProps } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';
import { useThemeColor } from '../hooks/useThemeColor';

export type ButtonProps = ViewProps & {
  title: string | React.ReactElement;
  onPress?: () => void;
}

const Button = ({ title, onPress }: ButtonProps) => {
  const color = useThemeColor({light: '#000000', dark: '#000000'}, 'background');
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
      <ThemedText style={[styles.title, {color}]}>{title}</ThemedText>
      </TouchableOpacity>
    </View>
  )
}

export default Button;

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#fcc100',
        borderRadius: 200,
        alignItems: 'center',
        marginVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1
    }
})