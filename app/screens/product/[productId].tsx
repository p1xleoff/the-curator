import { ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import ProductTitle from "../../components/ProductTitle";
import Rating from "../../components/Rating";
import { ThemedText } from "../../components/ThemedText";
import { useProduct } from "../../hooks/firebaseHooks/productHooks";
import { Loader } from "../../components/Loading";
import Section from "../../components/Section";
import Stars from "../../components/Stars";
import { useLocalSearchParams } from "expo-router";
import { ProductReviews } from "../../components/Reviews";

const Product = () => {
  const { productId } = useLocalSearchParams<{productId?:string}>();
  const { data: product, isLoading, isError, error } = useProduct(productId);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ThemedText>{error?.message}</ThemedText>;
  }

  return (
    <ScrollView style={styles.container}>
      <ProductTitle name={product.title} category={product.category} />
      <ThemedText>{productId}</ThemedText>
      <Image style={styles.image} source={{ uri: product.image }} />
      <Section>
        <Stars readOnly={true} rating={4} starNum={4.9} />
      </Section>
      <Section>
        <ThemedText type="subtitle">Product description</ThemedText>
      </Section>
        <ThemedText>{product.description}</ThemedText>
      <Section>
        <ThemedText type="subtitle">Reviews for this product</ThemedText>
      </Section>
        <ProductReviews productId={productId} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  image: {
    width: "auto",
    height: 200,
    borderRadius: 5,
  },
});

export default Product;
