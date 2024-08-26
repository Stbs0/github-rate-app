import React from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
export function BarTab({ name, path, onClick = () => {} }) {
  console.log("hiugi", onClick);
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={async () => {
        await onClick();
      }}>
      {path ? (
        <Link to={path}>
          <Text style={styles.text}>{name}</Text>
        </Link>
      ) : (
        <Text style={styles.text}>{name}</Text>
      )}
    </TouchableOpacity>
  );
}
