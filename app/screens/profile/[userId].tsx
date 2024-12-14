import { ScrollView, StyleSheet, View, Text } from "react-native";
import React from "react";
import ProfileCard from "../../components/ProfileCard";
import { ThemedText } from "../../components/ThemedText";
import Section from "../../components/Section";
import { ThemedView } from "../../components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { useUserProfile } from "../../services/firebase/userServices";
import { formatDate } from "../../services/utils/dateTime";
import { ProfileReviews } from "../../components/Reviews";
import Loader from "../../components/Loading";

const Profile = () => {
  const { userId, userName } = useLocalSearchParams<{
    userId?: string;
    userName?: string;
  }>();
  const { profile, loading } = useUserProfile(userId);

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center" }}>
        <Loader />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ProfileCard
          userName={userName}
          joined={formatDate(profile.created)}
          reviewCount={profile.numberOfReviews}
          upvotes={profile.upvotes}
        />
        <ThemedText type="subtitle">Reviews</ThemedText>
        <Section>
          <ProfileReviews userId={userId} />
        </Section>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default Profile;
