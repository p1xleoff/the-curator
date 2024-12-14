import {  View } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'

type ReviewDetails = {
    totalReviews: number,
    verified: number,
}

const ReviewDetails = ({ totalReviews, verified }: ReviewDetails) => {
  return (
    <View>
      <ThemedText type='defaultSemiBold'>{totalReviews} total reviews | {verified} Verified</ThemedText>
    </View>
  )
}

export default ReviewDetails;