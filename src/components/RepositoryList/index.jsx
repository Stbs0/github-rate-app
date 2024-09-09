import { FlatList, View, StyleSheet, Text, Pressable } from "react-native";
import Item from "./RepositoryItem";
import { useState, useEffect } from "react";
import useRepositories from "../../hooks/useRepository";
import { redirect, useNavigate } from "react-router-native";

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

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const navigate = useNavigate();
  return (
    <FlatList
      data={repositoryNodes}
      style={styles.container}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <Item
            key={item.id}
            {...item}
          />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { data, loading, error } = useRepositories();
  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error</Text>;
  }
  return <RepositoryListContainer repositories={data.repositories} />;
};

export default RepositoryList;
