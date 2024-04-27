import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function MessageItem({ mes, cur }) {
  const [done, setDone] = React.useState(false);

  return (
    <View
      style={[
      styles.container,
      ]}
    >
      <View
        style={[
           styles.curMessageContainer,
        ]}
      >
        <Icon name="check" color={done ? "pink" : "black"} />
        <Text style={styles.text}>{mes}</Text>
      </View>
    </View>
  );
}
const screenWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
  },
  curMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    maxWidth: screenWidth * 0.58,
    backgroundColor: "pink",
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 18,
    fontWeight: "800",
    marginLeft: 8,
  },
});
