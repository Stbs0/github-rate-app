import { BarTab } from "./BarTab";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import { useApolloClient, useQuery } from "@apollo/client";
import useAuthStorage from "../../hooks/useAuthStorage";
import { ME } from "../../graphql/queries";
import { useState } from "react";

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
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });
  if (error) {
    console.log(error);
    return <Text>Error</Text>;
  }
  if (loading) {
    return <Text>loading</Text>;
  }
  console.log(data);

  const logOut = async () => {
    try {
      console.log("logging out");
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isSignedIn = () => !!data.me;

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
          <>
            <BarTab
              name={"Create a review"}
              path={"/create-review"}
            />
            <BarTab
              name={"My reviews"}
              path={"/my-reviews"}
            />
            <BarTab
              name={"Sign out"}
              path={null}
              onClick={logOut}
            />
          </>
        ) : (
          <>
            <BarTab
              name={"Sign Up"}
              path={"/sign-up"}
            />
            <BarTab
              name={"Sign in"}
              path={"/sign-in"}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
