import { StyleSheet, View, Image } from "react-native";
import React from "react";

//auth
import auth from "@react-native-firebase/auth";

import AccountInfoCard from "../components/AccountInfo";
import { ThemedText } from "../components/ThemedText";
import Avatar from "../components/Avatar";
import Button from "../components/Button";

const Account = () => {
  const user = auth().currentUser;
  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Avatar size={120} />
        <View style={styles.profileCard}>
          <ThemedText type="title">{user.displayName}</ThemedText>
        </View>
      </View>
      <View>
        <AccountInfoCard
          fullName={user.displayName}
          phoneNum={user.phoneNumber}
          email={user.email}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10 }}>
        <Button title="Save Changes" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  profileCard: {
    marginTop: 15,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 75,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  userStats: {
    flexDirection: "row",
  },
  userStatText: {
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Account;
