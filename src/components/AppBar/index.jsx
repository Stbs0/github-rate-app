import { BarTab } from "./BarTab";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../../theme";
import useLogOut from "../../hooks/useLogOut";

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
  const { logOut, data, isSignedIn, loading } = useLogOut();
  if (loading) {
    return <Text>Loading</Text>;
  }
  console.log(data.me);
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scroll}>
        <BarTab
          name={"Repositories"}
          path={"/"}
        />
        {isSignedIn() ? (
          <BarTab
            name={"Sign out"}
            path={null}
            onClick={logOut}
          />
        ) : (
          <BarTab
            name={"Sign in"}
            path={"/sign-in"}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
