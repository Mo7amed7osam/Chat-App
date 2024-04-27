import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

export default function MyButton({ onPress, style, children, color }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: color || "rgb(33, 150, 243)",
          opacity: pressed ? 0.2 : 1,
        },
        styles.wrapperCustom,
        style || {},
      ]}
    >
      {/* Ensure children are properly handled */}
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapperCustom: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    padding: 8,
  },
  text: {
    color: "white",
  },
});
