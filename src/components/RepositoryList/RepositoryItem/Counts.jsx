import React from "react";
import { StyleSheet, Text, View } from "react-native";
import theme from "../../../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontWeight: theme.fontWeights.bold,
  },
});
export function Counts({ count, name }) {
  if (count >= 1000) {
    count = (count / 1000).toFixed(1) + "k";

    count.toString();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{count}</Text>
      <Text>{name}</Text>
    </View>
  );
}
