import { StyleSheet, View, type ViewProps } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import SearchBar from "./SearchBar";

export type HeaderProps = ViewProps & {
  title?: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={{paddingBottom: 10}}>{title}</ThemedText>
      <SearchBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default Header;
