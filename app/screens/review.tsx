import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Reviewer from '../components/Reviewer'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import ReviewImages from '../components/ReviewImages';
import { ThemedText } from '../components/ThemedText';
import lmao from './lmao.json'
import ReviewActions from '../components/ReviewActions';
import Button from '../components/Button';
import ProductTitle from '../components/ProductTitle';

const Review = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <ProductTitle name='Razer Viper Mini' category='Wired Gaming Mouse' />
        <Reviewer name='p1xle' picture='https://picsum.photos/30/30' />
        <View style={styles.rating}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Icon key={index} name="star" size={24} style={styles.icon} />
          ))}
        </View>
        <View>
          <ThemedText style={styles.dateloc}>Reviewed in India on 15 November 2023</ThemedText>
        </View>
        <View style={{ marginVertical: 10 }}>
          <ThemedText style={styles.title}>Lightweight, Precise and Affordable</ThemedText>
          <ThemedText style={styles.text}>112 Upvotes</ThemedText>
        </View>
      </View>
      <View>
        <ReviewImages />
      </View>
      <View>
        {lmao.text.map((text, index) => (<ThemedText key={index} style={styles.text}>{text}</ThemedText>))}
      </View>
      <View>
        <View style={styles.purchaseDetails}>
          <ThemedText style={styles.title}>Purchase Details</ThemedText>
          <ThemedText style={styles.text}>Store:
            <ThemedText style={[styles.text, { fontWeight: '600' }]}> Amazon</ThemedText>
          </ThemedText>
          <ThemedText style={styles.text}>Price:
            <ThemedText style={[styles.text, { fontWeight: '600' }]}> $30</ThemedText>
          </ThemedText>
        </View>
        <View>
          <ReviewActions />
        </View>
        <Button title='See more reviews for this product'  />
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 25,
    // marginVertical: 20
  },
  rating: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  icon: {
    color: '#ecb708'
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  dateloc: { //date and locatin styles
    fontSize: 12,
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
  },
  purchaseDetails: {
    marginVertical: 25,
  },
})

export default Review;