import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  loadUserReviews,
  useAllReviews,
  useProductReviews,
  useUserReviews,
} from "../hooks/firebaseHooks/reviewHooks";
import Loader from "./Loading";
import ReviewCard from "./ReviewCard";
import { Review } from "../types/types";
import { ThemedText } from "./ThemedText";

const UserReviews = () => {
  const { data: reviews, isLoading, isError } = loadUserReviews();
  if (isLoading) {
    return <Loader />;
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

type UserReviewProps = {
  userId: string;
}

const ProfileReviews = ({ userId }: UserReviewProps) => {
  const { data: reviews, isLoading, isError } = useUserReviews(userId);
  if (isLoading) {
    return <Loader />;
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

type ProductProps = {
  productId: string;
};

const ProductReviews = ({ productId }: ProductProps) => {
  const {
    data: productReviews,
    isLoading,
    isError,
  } = useProductReviews(productId);
  if (isLoading) {
    return <Loader />;
  } 
  if (productReviews.length == 0 ) {
    <ThemedText>There are no reviews for this product yet</ThemedText>
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
      data={productReviews}
      keyExtractor={(item) => item.id ?? ""}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

const AllReviews = () => {
  const {
    data: allReviews,
    isLoading,
    isError,
  } = useAllReviews();
  if (isLoading) {
    return <Loader />;
  } 
  if (allReviews.length == 0 ) {
    <ThemedText>There are no reviews for this product yet</ThemedText>
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
      data={allReviews}
      keyExtractor={(item) => item.id ?? ""}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({});

export { UserReviews, ProductReviews, AllReviews, ProfileReviews };
