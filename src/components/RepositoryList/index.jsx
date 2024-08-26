import { FlatList, View, StyleSheet, Text } from "react-native";
import Item from "./RepositoryItem";
import { useState, useEffect } from "react";
import useRepositories from "../../hooks/useRepository";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    height: "100%",
    display: "flex",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
 const { data, error, loading } = useRepositories();

 if (loading) {
   return <Text>Loading</Text>;
 }
 if (error) {
   return <Text>Error: {error.message}</Text>;
 }
 const { repositories } = data;
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      style={styles.container}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Item
          key={item.id}
          {...item}
        />
      )}
    />
  );
};

export default RepositoryList;
