import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { ThemedText } from './ThemedText';
import StarBars from './StarBars';

const Rating = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.ratingContainer}>
        <View style={styles.rating}>
          {Array.from({ length: 5 }).map((_, index) => (
            <TouchableOpacity>
              <Icon key={index} name="star" size={24} style={styles.icon} />
            </TouchableOpacity>
          ))}
          <ThemedText style={styles.starNum}> 4.9</ThemedText>
        </View>
        <View style={styles.details}>
          <ThemedText style={styles.detailsText}>1233 total reviews | 932 Verified</ThemedText>
        </View>
      </View>
      <View style={styles.starDetails}>
        <StarBars total={100} five={93} four={6} three={1} two={0} one={0} />
      </View>
      <View>

      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {},
  ratingContainer: {
    // backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 5
  },
  rating: {
    flexDirection: 'row',
    marginVertical: 7,
    alignItems: 'center',
  },
  icon: {
    color: '#ecb708'
  },
  starNum: {
    fontWeight: 'bold',
    fontSize: 18
  },
  details: {},
  detailsText: {
    fontSize: 16,
    fontWeight: '600'
  },
  starDetails: {
    marginBottom: 15
  },
})

export default Rating;