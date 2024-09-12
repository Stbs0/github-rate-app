import { StyleSheet, View } from "react-native";

import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import SignIn from "./SignIn";
import SingleRepoView from "./RepositoryList/SingleRepoView";
import Item from "./RepositoryList/RepositoryItem";
import Review from "./Review";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews/MyReviews";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />

      <Routes>
        <Route
          path='/'
          element={<RepositoryList />}
        />
        <Route
          path='/sign-in'
          element={<SignIn />}
        />
        <Route
          path='/sign-up'
          element={<SignUp />}
        />
        <Route
          path='/create-review'
          element={<Review />}
        />
        <Route
          path='/my-reviews'
          element={<MyReviews />}
        />
        <Route
          path='/:id'
          element={<SingleRepoView />}
        />
        <Route
          path='/*'
          element={
            <Navigate
              to='/'
              replace
            />
          }
        />
      </Routes>
    </View>
  );
};

export default Main;
