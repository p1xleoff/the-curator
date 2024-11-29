import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '../components/SearchBar'
import ItemCard from '../components/ItemCard'
import Header from '../components/Header'

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Header title='The Curator' />
      <SearchBar />
      <View>
      </View>
      <ItemCard />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 15,
    marginTop: StatusBar.currentHeight
  },
})

export default Home;