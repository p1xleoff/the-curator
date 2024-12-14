import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import {
  loadUserReviews,
} from "../hooks/firebaseHooks/reviewHooks";
import Loader from "./Loading";
import ReviewCard from "./ReviewCard";
import { Review } from "../types/types";
import { ThemedText } from "./ThemedText";

const ReviewsList = () => {
  const { data: reviews, isLoading, isError } = loadUserReviews();
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Loader />
      </View>
    );
  } else if (reviews.length == 0) {
    return <ThemedText>No reviews yet</ThemedText>;
  } else if (isError) {
    return <ThemedText>Something went wrong</ThemedText>;
  }

  const renderReview = ({ item }: { item: Review }) => (
    <ReviewCard
      productName={item.productName}
      rating={item.rating}
      upvotes={item.upvotes}
      userName={item.userName}
      item={item.id}
    />
  );
  return (
    <FlatList
      renderItem={renderReview}
      data={reviews}
      keyExtractor={(item) => item.id ?? ""}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({});

export default ReviewsList;
