import { Image, StyleSheet, View, type ViewProps } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import { Link } from "expo-router";

export type ReviewerProps = ViewProps & {
  name: string;
  picture?: string;
};

const Reviewer = ({ name, picture }: ReviewerProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: picture || "https://picsum.photos/30/30" }}
        style={styles.image}
      />
      <ThemedText style={styles.name}>{name}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    borderRadius: 5,
    // backgroundColor: '#e6e6e6',
    // marginVertical: 22,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginStart: 10,
  },
});

export default Reviewer;
