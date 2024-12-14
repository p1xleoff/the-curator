import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { useProducts } from "../hooks/firebaseHooks/productHooks";
import { ThemedView } from "../components/ThemedView";
import { ThemedText } from "../components/ThemedText";

const ProductListScreen = () => {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (isError) {
    return <Text>Error: {error?.message}</Text>;
  }

  // Ensure the data is formatted correctly
  const formattedProducts = products.map((product, index) => ({
    id: product.id || index.toString(),
    name: product.title,
    image: product.image,
    category: product.category,
    description: product.description,
  }));

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={formattedProducts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Link
              href={{
                pathname: "/screens/product/[productId]",
                params: { productId: item.id },
              }}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ padding: 5 }}>
                <ThemedText type="subtitle">{item.name}</ThemedText>
                <ThemedText type="subtext">{item.category}</ThemedText>
              </View>
            </Link>
          </View>
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  card: {
    marginVertical: 5,
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 1,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

export default ProductListScreen;
