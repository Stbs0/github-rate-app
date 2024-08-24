import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../../../theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  btnText: {
    color: "white",
  },
});

export function BtnPrimary({ btnTitle }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button}  >
        <Text style={styles.btnText}>{btnTitle}</Text>
      </Pressable>
    </View>
  );
}
