import {
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
import RatingStars from "../components/RatingStars";
import UploadButton from "../components/UploadButton";
import ProductTitle from "../components/ProductTitle";
import ThemedInput from "../components/ThemedInput";
import Button from "../components/Button";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

type MediaItem = {
  uri: string;
  type: "image" | "video";
  duration?: number;
};

const Upload = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images", "videos"],
      quality: 1,
    });

    if (!result.canceled) {
      const newMedia: MediaItem[] = result.assets.map((asset) => ({
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
      const newMedia: MediaItem[] = result.assets.map((asset) => ({
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

  const renderItem = ({ item }: { item: MediaItem }) => (
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
    <ScrollView contentContainerStyle={styles.container}>
      <ProductTitle name="Razer Viper Mini" category="Wired Gaming Mouse" />
      <View style={styles.section}>
        <ThemedText type="subtitle">How would you rate it?</ThemedText>
        <RatingStars rating={4} />
      </View>
      <View style={styles.section}>
        <ThemedText type="subtitle">Add photo/video</ThemedText>
        <View style={styles.rating}>
          <UploadButton title="Click a photo" onPress={openCamera} />
          <UploadButton title="Upload from Gallery" onPress={openLibrary} />
        </View>
      </View>
      <View>
        <FlatList
          renderItem={renderItem}
          data={mediaItems}
          keyExtractor={(item, index) => `${item.uri}-${index}`}
          horizontal
        />
      </View>
      <View style={styles.section}>
        <ThemedText type="subtitle">Title your review</ThemedText>
        <ThemedInput multiline={false} name="review title" maxLength={60} />
      </View>
      <View style={styles.section}>
        <ThemedText type="subtitle">Write your review</ThemedText>
        <ThemedInput
          multiline={true}
          name="review"
          placeholder="Share details about the product..."
        />
      </View>
      <View style={styles.section}>
        <ThemedText type="subtitle">Add Product Pruchase Details</ThemedText>
        <ThemedText type="default">
          Which store did you purchase the product from
        </ThemedText>
        <ThemedInput multiline={false} name="store" />
        <ThemedText>How much did you pay for the product</ThemedText>
        <ThemedInput
          multiline={false}
          name="price"
          placeholder="Price in Rupees"
        />
      </View>
      <View style={styles.section}>
        <ThemedText type="subtitle">Add Product Pruchase Details</ThemedText>
        <ThemedText type="default">
          Which store did you purchase the product from
        </ThemedText>
        <ThemedInput multiline={false} name="store" />
        <ThemedText>How much did you pay for the product</ThemedText>
        <ThemedInput
          multiline={false}
          name="price"
          placeholder="Price in Rupees"
        />
      </View>
      <View>
        <Button title="Submit" />
      </View>
    </ScrollView>
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
  section: {
    marginVertical: 15,
  },
  rating: {
    flexDirection: "row",
    marginVertical: 7,
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
