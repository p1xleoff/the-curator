import { StyleSheet, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

//auth
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { ThemedText } from "../components/ThemedText";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import { loadCurrentUser } from "../hooks/firebaseHooks/userHooks";
import { Loader } from "../components/Loading";
import ThemedInput from "../components/ThemedInput";
import { ThemedView } from "../components/ThemedView";
import { formatDate } from "../services/utils/dateTime";

const Account = () => {
  const user = auth().currentUser;
  const { userData, loading, updateProfile } = loadCurrentUser();
  const joinDate = user.metadata.creationTime;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Loader />
      </View>
    );
  }
  const handleSave = async () => {
    await updateProfile({ fullName: name, phoneNumber });
    setIsEditing(false);
  };

  return (
    <ThemedView style={styles.container}>
      {userData && (
        <>
          <View style={styles.profileCard}>
            {profilePicture ? <Avatar size={120} /> : <Avatar size={120} />}
            <View style={styles.profileCard}>
              <ThemedText type="title">{user.displayName}</ThemedText>
            </View>
          </View>
          <View>
            {isEditing ? (
              <>
                <ThemedText type="subtext">Name</ThemedText>
                <ThemedInput
                  value={name}
                  onChangeText={setName}
                  placeholder={userData.fullName ? userData.fullName : 'Enter display name'}
                />
                <ThemedText type="subtext">Phone Number</ThemedText>
                <ThemedInput
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder={userData.phoneNumber? userData.phoneNumber : "Mobile Number"}
                  keyboardType="phone-pad"
                />
              </>
            ) : (
              <>
                <View style={styles.item}>
                  <ThemedText type="subtext">Email</ThemedText>
                  <ThemedText type="subtitle">{user.email}</ThemedText>
                </View>
                <View style={styles.item}>
                  <ThemedText type="subtext">Display Name</ThemedText>
                  <ThemedText type="subtitle">{userData.fullName}</ThemedText>
                </View>
                <View style={styles.item}>
                  <ThemedText type="subtext">Phone Number</ThemedText>
                  <ThemedText type="subtitle">
                    {userData.phoneNumber}
                  </ThemedText>
                </View>
                <View style={styles.item}>
                  <ThemedText type="subtext">Joined</ThemedText>
                  <ThemedText type="subtitle">
                    {formatDate(joinDate)}
                  </ThemedText>
                </View>
              </>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={isEditing ? "Save Changes" : "Edit Profile"}
              onPress={isEditing ? handleSave : () => setIsEditing(true)}
            />
          </View>
        </>
      )}
    </ThemedView>
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
  input: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  item: {
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});

export default Account;
