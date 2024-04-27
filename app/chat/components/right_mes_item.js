import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
export default function RightMessageItem({ mes }) {
  const [done, setDone] = React.useState(false);

  return (
    <View
      style={[
        styles.rightContainer,
      ]}
    >
      <View
        style={[
          styles.notCurMessageContainer,
        ]}
      >
        <Text style={styles.text}>{mes}</Text>
      </View>
    </View>
  );
}
const screenWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  rightContainer:{
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "flex-end",
  },
  notCurMessageContainer:{
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    maxWidth: screenWidth * 0.58,
    backgroundColor: "lightblue",
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 18,
    fontWeight: "800",
    marginLeft: 8,
  },
});
