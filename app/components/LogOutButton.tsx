import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

//firebase
import auth from "@react-native-firebase/auth";
import { signOut } from "../services/firebase/firebase";

const LogOutButton = () => {
  const user = auth().currentUser;

  const handleSignOut = async () => {
    try {
        await signOut();
    } catch (error) {
        console.error('Error signing out');
    }
  }


  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={handleSignOut}>
        <Icon name="logout-variant" size={22} style={styles.icon} />
        <Text style={styles.text}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#d3d3d3',
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "red",
  },
  icon: {
    marginEnd: 20,
    color: "red",
  },
});

export default LogOutButton;
