import { StyleSheet, View, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Reviewer from "../components/Reviewer";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import ReviewImages from "../components/ReviewImages";
import { ThemedText } from "../components/ThemedText";
import lmao from "./lmao.json";
import ReviewActions from "../components/ReviewActions";
import Button from "../components/Button";
import ProductTitle from "../components/ProductTitle";
import { getReview } from "../services/firebase/reviewsServices";
import Stars from "../components/Stars";
import Loader from "../components/Loading";
import Section from "../components/Section";
import { ThemedView } from "../components/ThemedView";

const Review = ({ route }) => {
  const reviewId = route.params.id;
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const review = await getReview(reviewId);
        if (review) {
          setReview(review);
        } else {
          Alert.alert("Error", "Review not found");
        }
      } catch (error) {
        console.error("Error fetching review", error);
        Alert.alert("Error", "Failed to fetch review");
      }
    };
    fetchReview();
  }, [reviewId]);

  if (!review) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <Section>
          <ProductTitle name="Razer Viper Mini" category="Wired Gaming Mouse" />
          <Reviewer
            name={review.userId}
            picture="https://picsum.photos/30/30"
          />
          <View style={styles.rating}>
            <Stars rating={review.rating} readOnly />
          </View>
          <View>
            <ThemedText style={styles.dateloc}>
              Reviewed in {review.country}
            </ThemedText>
          </View>
          <View style={{ marginVertical: 10 }}>
            <ThemedText type="subtitle">{review.title}</ThemedText>
            <ThemedText type="default">{review.upvotes} upvotes</ThemedText>
          </View>
        </Section>
        <Section>
          <ReviewImages />
        </Section>
        <Section>
          <ThemedText type="default">{review.description}</ThemedText>
        </Section>
        <Section>
          <ThemedText type="subtitle">Purchase Details</ThemedText>
          <ThemedText type="default">
            Store:&nbsp;
            <ThemedText type="subtitle">{review.store}</ThemedText>
          </ThemedText>
          <ThemedText>
            Price:&nbsp;
            <ThemedText style={[styles.text, { fontWeight: "600" }]}>
              {review.price}
            </ThemedText>
          </ThemedText>
        </Section>
        <Section>
          <ReviewActions />
        </Section>
        <Section>
          <Button title="See more reviews for this product" />
        </Section>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 25,
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
