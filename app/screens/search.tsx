import React, { useState } from "react";
import { View, FlatList, StyleSheet, TextInput } from "react-native";
import ReviewCard from "../components/ReviewCard";
import { ThemedText } from "../components/ThemedText";
import { useSearchReviews } from "../hooks/firebaseHooks/search";
import { Review } from "../types/types";
import { ThemedView } from "../components/ThemedView";
import { useThemeColor } from "../hooks/useThemeColor";
import Loader from "../components/Loading";
import Button from "../components/Button";

const SearchScreen = () => {
  const [query, setQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);
  const { reviews, loading } = useSearchReviews(query);

  const background = useThemeColor(
    { light: "#dfdfdf", dark: "#222222" },
    "background"
  );
  const color = useThemeColor(
    { light: "#000000", dark: "#ffffff" },
    "background"
  );

  const handleSearch = () => {
    setSearchQuery(query);
    setSearched(true);
  };

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
    <ThemedView style={styles.container}>
      <View style={[styles.searchContainer, { backgroundColor: background }]}>
        <TextInput
          style={[styles.searchText, { color: color }]}
          placeholder="Search for product reviews"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      {loading ? (
        <Loader />
      ) : searched && reviews.length === 0 ? ( // Show "No reviews found" only after search
        <ThemedText>No reviews found.</ThemedText>
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderReview}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={handleSearch} />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    borderRadius: 50,
    padding: 12,
    elevation: 5,
    marginBottom: 10,
  },
  searchText: {
    fontWeight: "800",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignSelf: "center",
  },
});

export default SearchScreen;
