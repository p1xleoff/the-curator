import React from "react";
import { View, StyleSheet, Alert, ScrollView, Linking } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { ThemedText } from "../../components/ThemedText";
import ReviewImages from "../../components/ReviewImages";
import Reviewer from "../../components/Reviewer";
import Section from "../../components/Section";
import Stars from "../../components/Stars";
import { ThemedView } from "../../components/ThemedView";
import Loader from "../../components/Loading";
import Button from "../../components/Button";
import { useReviews } from "../../hooks/firebaseHooks/reviewHooks";
import { useUpvote } from "../../services/firebase/upvotes";
import { formatReviewDate } from "../../services/utils/dateTime";

const Review = () => {
  const { reviewId } = useLocalSearchParams<{ reviewId?: string }>();
  const { data: review, isLoading, isError } = useReviews(reviewId);
  const { hasUpvoted, toggleUpvote, upvotes } = useUpvote(reviewId || "");

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Loader />
      </View>
    );
  }

  if (!review) {
    return (
      <View>
        <ThemedText type="default">Review not found.</ThemedText>
      </View>
    );
  }

  const createdDate = review.createdAt
    ? formatReviewDate(review.createdAt)
    : null;

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <ThemedText type="title">{review.productName}</ThemedText>
          <Link
            href={{
              pathname: "/screens/profile/[userId]",
              params: { userId: review.userId, userName: review.userName },
            }}
          >
            <Reviewer
              name={review.userName}
              picture="https://picsum.photos/30/30"
            />
          </Link>
          <View style={styles.rating}>
            <Stars rating={review.rating} readOnly />
          </View>
          <View>
            <ThemedText style={styles.dateloc}>
              Reviewed in {review.country} on {createdDate}
            </ThemedText>
            <ThemedText type="defaultSemiBold">{upvotes} upvotes</ThemedText>
          </View>
          <View style={{ marginVertical: 10 }}>
            <ThemedText type="subtitle">{review.title}</ThemedText>
          </View>
        </View>
        <ReviewImages />
        <ThemedText type="default">{review.description}</ThemedText>
        <Section>
          <ThemedText type="subtitle">Purchase Details</ThemedText>
          <ThemedText type="default">
            Store:&nbsp;
            <ThemedText type="defaultSemiBold">{review.store}</ThemedText>
          </ThemedText>
          <ThemedText>
            Price:&nbsp;
            <ThemedText type="defaultSemiBold">{review.price}</ThemedText>
          </ThemedText>
        </Section>
      </ScrollView>
      <Section>
        <Button
          title={hasUpvoted ? "Undo Upvote" : "Upvote this review"}
          onPress={toggleUpvote}
        />
      </Section>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  rating: {
    flexDirection: "row",
    marginVertical: 7,
  },
  icon: {
    color: "#ecb708",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  dateloc: {
    //date and locatin styles
    fontSize: 12,
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
  },
  purchaseDetails: {
    marginVertical: 25,
  },
});

export default Review;
