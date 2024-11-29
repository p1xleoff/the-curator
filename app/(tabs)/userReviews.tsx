import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemCard from '../components/ItemCard'
import SearchBar from '../components/SearchBar'
import Header from '../components/Header'
import ActionButton from '../components/ActionButton'

const UserReviews = () => {
  return (
    <View style={styles.container}>
      <Header title='My Reviews' />
      <SearchBar />
      <ItemCard />

      <ActionButton iconName={"plus"} />
    </View>
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

export default UserReviews;