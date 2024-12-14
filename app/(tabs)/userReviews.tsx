import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import ActionButton from "../components/ActionButton";
import ReviewsList from "../components/ReviewsList";
import { ThemedView } from "../components/ThemedView";

const UserReviews = () => {
  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="My Reviews" />
        <ReviewsList />
      </ScrollView>
      <ActionButton iconName={"plus"} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 15,
  },
});

export default UserReviews;
