import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemCard from '../components/ItemCard'

const Upvoted = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
      </View>
      <ItemCard />
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: StatusBar.currentHeight
      },
})

export default Upvoted;