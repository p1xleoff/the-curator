import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import { AllReviews } from "../components/Reviews";
import { ThemedView } from "../components/ThemedView";

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="The Curator" />
        <AllReviews />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: StatusBar.currentHeight,
  },
});

export default Home;
