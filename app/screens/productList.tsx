import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useProducts } from "../hooks/firebaseHooks/productHooks";
import { Loader } from "../components/Loading";
import { ThemedText } from "../components/ThemedText";

const ProductList = ({ navigation }: any) => {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ThemedText>{error?.message}</ThemedText>;
  }

  const handleProductPress = (productId: string) => {
    navigation.navigate("ProductDetails", { productId });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductPress(item.id)}>
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductList;
