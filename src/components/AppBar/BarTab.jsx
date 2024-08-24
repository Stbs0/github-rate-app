import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";
import theme from "../../theme";
const styles = StyleSheet.create({
  text: {
    fontSize: theme.fontSizes.subheading,
    color: "white",
    fontWeight: "bold",
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
export function BarTab({ name, path }) {
  return (
    <Pressable
      style={styles.btn}
      onPress={() => console.log("pressed")}>
      <Link to={path}>
        <Text style={styles.text}>{name}</Text>
      </Link>
    </Pressable>
  );
}
