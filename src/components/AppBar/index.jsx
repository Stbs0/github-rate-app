import { BarTab } from "./BarTab";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "rgba(0,0,0,0.8)",
    height: 100,
    paddingLeft: 10,
  },
  scroll: {
    gap: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scroll}>
        <BarTab
          name={"Repositories"}
          path={"/"}
        />
        <BarTab
          name={"Sign in"}
          path={"/sign-in"}
        />
      </ScrollView>
    </View>
  );
};

export default AppBar;
