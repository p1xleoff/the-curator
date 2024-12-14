import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ThemedText } from "./ThemedText";

interface RatingProps {
  maxStars?: number;
  rating: number;
  readOnly: boolean;
  starNum?: number;
  size?: number,
  onRate?: (rating: number) => void; //handle rating submission
}

const Stars = ({
  maxStars = 5,
  rating = 0,
  readOnly = false,
  starNum,
  size,
  onRate,
}: RatingProps) => {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleRating = (newRating: number) => {
    if (readOnly) return; //not touchable when disabled
    setCurrentRating(newRating);
    if (onRate) onRate(newRating); //callback with the new rating
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }, (_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleRating(index + 1)}
          disabled={readOnly}
        >
          <Icon
            name={index < currentRating ? "star" : "star-outline"}
            size={readOnly ? size || 26 : 60}
            style={styles.icon}
          />
        </TouchableOpacity>
      ))}
      <ThemedText type="subtitle" style={styles.starText}>
        {starNum}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: "#ecb708",
  },
  starText: {
    marginStart: 5,
  },
});

export default Stars;
