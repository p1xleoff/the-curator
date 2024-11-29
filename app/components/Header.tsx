import { StyleSheet, Text, View, type ViewProps  } from 'react-native'
import React from 'react'

export type HeaderProps = ViewProps & {
    title?: string;
  };

const Header = ({title}: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 15
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333333',
        fontFamily: 'Bahnschrift'
    },
})

export default Header;