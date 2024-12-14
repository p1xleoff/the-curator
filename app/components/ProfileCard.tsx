import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import auth from "@react-native-firebase/auth";
import { loadCurrentUser } from "../hooks/firebaseHooks/userHooks";
import { ThemedText } from "./ThemedText";
import { loadUserReviews } from "../hooks/firebaseHooks/reviewHooks";
import { useUserProfile } from "../services/firebase/userServices";

type ProfileProps = {
  userName: string;
  displayName?: string;
  reviewCount?: number;
  upvotes?: number;
  joined: string;
};

const ProfileCard = ({
  userName,
  displayName,
  reviewCount,
  upvotes,
  joined,
}: ProfileProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          style={styles.image}
          source={{
            uri: "https://picsum.photos/80/80",
          }}
        />
        <View>
          <ThemedText type="title">{userName}</ThemedText>
          {/* <ThemedText type="defaultSemiBold">{displayName}</ThemedText> */}
        </View>
      </View>
      <View style={styles.userStats}>
        <ThemedText type="defaultSemiBold">{reviewCount} Reviews</ThemedText>
        <ThemedText type="defaultSemiBold">{upvotes} Upvotes</ThemedText>
        <ThemedText type="defaultSemiBold">{joined}</ThemedText>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  profileCard: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 75,
    marginEnd: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  userStats: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-evenly",
  },
  userStatText: {
    fontWeight: "600",
    fontSize: 16,
    marginEnd: 20,
  },
  userStatNum: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
