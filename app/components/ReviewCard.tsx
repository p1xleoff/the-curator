import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import Stars from "./Stars";
import Avatar from "./Avatar";
import { Link } from "expo-router";
import { useThemeColor } from "../hooks/useThemeColor";

type ReviewCardProps = {
  productName?: string;
  rating: number;
  upvotes: number;
  userName?: string;
  item: string;
};

const ReviewCard = ({
  productName,
  rating,
  upvotes,
  userName,
  item,
}: ReviewCardProps) => {
  const background = useThemeColor(
    { light: "#fff", dark: "#000" },
    "background"
  );
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      {/* <Image
        style={styles.image}
        source={{
          uri: "https://picsum.photos/300/200",
        }}
      /> */}
      <Link
        href={{
          pathname: "/screens/review/[reviewId]",
          params: { reviewId: item },
        }}
      >
        <View style={styles.itemInfo}>
          <ThemedText type="subtitle">{productName}</ThemedText>
          <View style={styles.row}>
            <Avatar size={24} />
            <ThemedText type="defaultSemiBold" style={styles.userName}>
              {userName}
            </ThemedText>
          </View>
          <View style={styles.row}>
            <Stars rating={rating} readOnly size={20} />
            <ThemedText type="default">{upvotes} Upvotes</ThemedText>
          </View>
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: "#858585",
    marginBottom: 10,
    elevation: 1,
  },
  image: {
    width: "auto",
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  itemInfo: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    marginLeft: 10,
    paddingBottom: 4,
  },
});

export default ReviewCard;
