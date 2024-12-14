import { StyleSheet, TextInput, View, TextInputProps } from "react-native";
import React, { useState } from "react";

import { useThemeColor } from "../hooks/useThemeColor";

interface InputProps extends TextInputProps {
  label?: string;
  name?: string;
  multiline?: boolean;
  numOfLines?: number;
  maxLength?: number;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void; // Proper typing
}

const ThemedInput = ({
  label,
  name,
  multiline = false,
  maxLength,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  style,
  ...rest // for additional props like onBlur from textInput
}: InputProps) => {
  const [inputHeight, setInputHeight] = useState(50);
  const color = useThemeColor(
    { light: "#000000", dark: "#ffffff" },
    "background"
  );

  const handleInputSizeChange = (event: {
    nativeEvent: { contentSize: { height: number } };
  }) => {
    if (multiline) {
      setInputHeight(Math.max(50, event.nativeEvent.contentSize.height));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline={multiline}
        maxLength={maxLength}
        onContentSizeChange={handleInputSizeChange}
        placeholder={placeholder}
        placeholderTextColor="#a7a7a7"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value} // Add value prop
        onChangeText={onChangeText} // Add onChangeText prop
        style={[
          styles.input,
          multiline && { minHeight: 50, height: inputHeight },
          { color }, // adjust multiline height
          style,
        ]}
        {...rest} // additional props
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 14,
    borderColor: "#979797",
    color: "#fa640e",
    fontSize: 16,
  },
});

export default ThemedInput;
