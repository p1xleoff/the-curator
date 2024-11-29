import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileCard from '../components/ProfileCard'
import ItemCard from '../components/ItemCard'

const Profile = () => {
  return (
    <View style={styles.container}>
      <ProfileCard />
      <View style={styles.reviews}>
        <Text style={styles.heading}>Reviews</Text>
      </View>
      <View>
        <ItemCard />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    reviews: {},
    heading: {
        fontSize: 20,
        fontWeight: '600'
    }
})

export default Profile;