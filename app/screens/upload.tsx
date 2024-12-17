import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ThemedText } from "../components/ThemedText";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import UploadButton from "../components/UploadButton";
import ProductTitle from "../components/ProductTitle";
import ThemedInput from "../components/ThemedInput";
import Button from "../components/Button";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { UploadMedia } from "../types/mediaTypes";
import { Review } from "../types/reviewTypes";
import { addReview } from "../services/firebase/reviewsServices";
import { router } from "expo-router";
import Section from "../components/Section";
import Stars from "../components/Stars";
import * as yup from "yup";
import auth from "@react-native-firebase/auth";
import { ThemedView } from "../components/ThemedView";

const Upload = () => {
  const [mediaItems, setMediaItems] = useState<UploadMedia[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [link, setLink] = useState<string>("");
  const [store, setStore] = useState("");
  const user = auth().currentUser;

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images", "videos"],
      quality: 1,
    });

    if (!result.canceled) {
      const newMedia: UploadMedia[] = result.assets.map((asset) => ({
        uri: asset.uri,
        type: asset.type as "image" | "video",
        duration:
          asset.type === "video"
            ? Math.round((asset.duration || 0) / 1000)
            : undefined,
      }));
      setMediaItems((prev) => [...prev, ...newMedia]);
    }
  };

  const openLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      quality: 1,
    });

    if (!result.canceled) {
      const newMedia: UploadMedia[] = result.assets.map((asset) => ({
        uri: asset.uri,
        type: asset.type as "image" | "video",
        duration:
          asset.type === "video"
            ? Math.round((asset.duration || 0) / 1000)
            : undefined,
      }));
      setMediaItems((prev) => [...prev, ...newMedia]);
    }
  };

  const deleteMedia = (uri: string) => {
    setMediaItems((prev) => prev.filter((item) => item.uri !== uri));
  };

  const handleSubmit = async () => {
    try {
      await reviewSchema.validate(
        {
          productName,
          title,
          description,
          store,
          country,
          link,
          price,
        },
        { abortEarly: false }
      );

      const review: Review = {
        productName,
        userId: user.uid,
        userName: user.displayName,
        title,
        link,
        rating,
        description,
        country,
        price: parseFloat(price),
        multimedia: mediaItems.map((item) => item.uri),
        upvotes: 0,
        flagged: false,
        deleted: false,
        store,
        moderationStatus: "approved",
      };
      await addReview(review);
      Alert.alert("Thank you", "Your review has been submitted");
      router.back();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Alert.alert(
          "Looks like some things are missing",
          "Please fill in all the details before submitting the review"
        );
      } else
        Alert.alert(
          "Error",
          "Failed to add review, please try again after some time"
        );
    }
  };


  const reviewSchema = yup.object().shape({
    title: yup.string().required("Review title is required"),
    productName: yup.string().required("Product Name is required"),
    description: yup.string().required("Review description is required"),
    store: yup.string().required("Store name is required"),
    price: yup.number().required("Price is required"),
    country: yup.string().required("Country is required"),
  });

  const renderItem = ({ item }: { item: UploadMedia }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
      {item.type === "video" && (
        <View style={styles.duration}>
          <ThemedText>{item.duration}</ThemedText>
        </View>
      )}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteMedia(item.uri)}
      >
        <Icon name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Section>
          <ThemedText type="subtitle">What would you like to rate?</ThemedText>
          <ThemedInput
            value={productName}
            onChangeText={setProductName}
            multiline={false}
            name="product name"
            maxLength={60}
            placeholder="Enter the name of the product"
          />
        </Section>
        <ThemedText type="subtitle">How would you rate it?</ThemedText>
        <Section>
          <View style={{ alignItems: "center" }}>
            <Stars readOnly={false} rating={0} onRate={setRating} />
          </View>
        </Section>
        <Section>
          <ThemedText type="subtitle">Add photo/video</ThemedText>
          <View style={styles.rating}>
            <UploadButton title="Click a photo" onPress={openCamera} />
            <UploadButton title="Upload from Gallery" onPress={openLibrary} />
          </View>
        </Section>
        <Section>
          <FlatList
            renderItem={renderItem}
            data={mediaItems}
            keyExtractor={(item, index) => `${item.uri}-${index}`}
            horizontal
          />
        </Section>
        <Section>
          <ThemedText type="subtitle">Title your review</ThemedText>
          <ThemedInput
            value={title}
            onChangeText={setTitle}
            multiline={false}
            name="review title"
            maxLength={60}
            placeholder="Add a short, descriptive title for the review"
          />
        </Section>
        <Section>
          <ThemedText type="subtitle">Write your review</ThemedText>
          <ThemedInput
            value={description}
            onChangeText={setDescription}
            multiline={true}
            name="review description"
            placeholder="Share details about the product..."
          />
        </Section>
        <Section>
          <ThemedText type="subtitle">Add Product Pruchase Details</ThemedText>
          <ThemedText type="default">
            Which store did you purchase the product from?
          </ThemedText>
          <ThemedInput
            value={store}
            onChangeText={setStore}
            multiline={false}
            name="store"
            placeholder="eg: Amazon, Flipkart, Local store"
          />
          <ThemedText>Add an online store product link (optional)</ThemedText>
          <ThemedInput
            value={link}
            multiline={true}
            onChangeText={setLink}
            name="country"
            placeholder="Link from Amazon, Flipkart or other stores"
          />
          <ThemedText>How much did you pay for the product?</ThemedText>
          <ThemedInput
            value={price}
            multiline={false}
            onChangeText={setPrice}
            name="price"
            placeholder="Price in Rupees"
            keyboardType="number-pad"
          />
          <ThemedText>
            What country did you purchase this product in?
          </ThemedText>
          <ThemedInput
            value={country}
            multiline={false}
            onChangeText={setCountry}
            name="country"
            placeholder="eg: India"
          />
        </Section>
        <View>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    position: "relative",
    margin: 5,
    borderRadius: 8,
    overflow: "hidden",
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  duration: {
    position: "absolute",
    bottom: 1,
    right: 5,
    borderRadius: 5,
  },
  rating: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#ecb708",
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 15,
  },
});

export default Upload;
