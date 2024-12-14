import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { loadUserReviews } from "../hooks/firebaseHooks/reviewHooks";
import { loadCurrentUser } from "../hooks/firebaseHooks/userHooks";
import { formatDate } from "../services/utils/dateTime";
import auth from "@react-native-firebase/auth";

const Profile = () => {
  const { userData } = loadCurrentUser();
  const { data: reviews } = loadUserReviews();
  
  return (
    <ThemedView style={styles.container}>
          <View style={styles.profileCard}>
            <Image
              style={styles.image}
              source={{
                uri: "https://picsum.photos/80/80",
              }}
            />
            <View>
              <ThemedText type="title">{userData.displayName}</ThemedText>
              <ThemedText type="defaultSemiBold">
                {userData.fullName ? userData.fullName : ""}
              </ThemedText>
            </View>
          </View>

          <View style={styles.userStats}>
            <ThemedText type="defaultSemiBold">
              {reviews ? reviews.length : "No reviews"} Reviews
            </ThemedText>
            <ThemedText type="defaultSemiBold"> Upvotes</ThemedText>
            <ThemedText type="defaultSemiBold">
             
            </ThemedText>
          </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  profileCard: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
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

export default Profile;
