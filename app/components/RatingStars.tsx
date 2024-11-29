import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <View style={styles.rating}>
      {Array.from({ length: 5 }).map((_, index) => {
        const isFullStar = index < Math.floor(rating);
        const isHalfStar = index < rating && index >= Math.floor(rating);

        return (
          <TouchableOpacity key={index}>
            <Icon
              name={isFullStar ? 'star' : isHalfStar ? 'star-half-full' : 'star-outline'}
              size={50}
              style={styles.icon}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 'auto'
  },
  icon: {
    marginHorizontal: 5,
    color: '#FFD700',
  },
});

export default RatingStars;
