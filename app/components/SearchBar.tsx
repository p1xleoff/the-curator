import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "../hooks/useThemeColor";

const SearchBar = () => {
  const background = useThemeColor(
    { light: "#dfdfdf", dark: "#222222" },
    "background"
  );
  return (
    <View>
      <Link href="/screens/search" style={[styles.searchContainer, { backgroundColor: background }]}>
        <ThemedText style={styles.searchText}>
          Search for products and reviews
        </ThemedText>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    borderRadius: 50,
    padding: 12,
    elevation: 1,
    marginBottom: 10,
  },
  searchText: {
    fontWeight: "600",
    color: "#7c7c7c",
  },
});

export default SearchBar;
