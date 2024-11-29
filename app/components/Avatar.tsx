import { StyleSheet, Image, View, type ViewProps } from "react-native";
import React from "react";

export type AvatarProps = ViewProps & {
  size: number;
};

const Avatar = ({ size }: AvatarProps) => {
  return (
    <View>
      <Image
        style={{ width: size, height: size, borderRadius: size / 2 }}
        source={{
          uri: "https://picsum.photos/120/120",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Avatar;
