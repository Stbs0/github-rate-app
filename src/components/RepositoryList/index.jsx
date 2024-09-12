import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Item from "./RepositoryItem";
import React, { useState, useEffect } from "react";
import useRepositories from "../../hooks/useRepository";
import { redirect, useNavigate } from "react-router-native";
import SortBy from "./SortBy";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    height: "100%",
    display: "flex",
    width: "100%",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const ListHeader = ({ searchQuery, setSearchQuery, sortBy, setSortBy }) => (
  <View className='p-2'>
    <Searchbar
      elevation={2}
      placeholder='Search'
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
    <SortBy
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  </View>
);

export const RepositoryListContainer = ({
  repositories,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  loading,
  onEndReach,
  error,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const navigate = useNavigate();
  return (
    <FlatList
      ListHeaderComponent={
        <ListHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      }
      onEndReachedThreshold={0.5}
      onEndReached={onEndReach}
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
  const [sortBy, setSortBy] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKeyword] = useDebounce(searchQuery, 500);

  const { repositories, loading, error, fetchMore } = useRepositories({
    sortBy,
    searchKeyword,
    first: 4,
  });
  if (error) {
    console.log(error);
    return <Text>Error</Text>;
  }
  if (loading) {
    return (
      <View className='absolute  w-full h-full items-center justify-center '>
        <ActivityIndicator
          animating={true}
          size={"large"}
        />
      </View>
    );
  }
  const onEndReach = () => {
    fetchMore();

    console.log("end");
  };
  return (
    <RepositoryListContainer
      sortBy={sortBy}
      setSortBy={setSortBy}
      repositories={repositories}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      error={error}
      loading={loading}
      onEndReach={onEndReach}
    />
  );
};
// export class RepositoryListContainer extends React.Component {
//   renderHeader = () => {
//     // this.props contains the component's props
//     const { sortBy, setSortBy, searchQuery, setSearchQuery } = this.props;
// console.log("Button clicked");
//     return (
//       <ListHeader
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         sortBy={sortBy}
//         setSortBy={setSortBy}
//       />
//     );
//   };

//   render() {
//     const { data, loading, error } = this.props;
//      if (loading) {
//        return <Text>Loading</Text>;
//      }

//      if (error) {
//        return <Text>Error</Text>;
//      }
//     const repositoryNodes = data.repositories
//       ? data.repositories.edges.map((edge) => edge.node)
//       : [];

//     return (
//       <FlatList
//       data={repositoryNodes}
//       style={styles.container}
//       ItemSeparatorComponent={ItemSeparator}
//       renderItem={({ item }) => (
//         <Pressable onPress={() => navigate(`/${item.id}`)}>
//             <Item
//               key={item.id}
//               {...item}
//               />
//           </Pressable>
//         )}
//         ListHeaderComponent={this.renderHeader}
//       />
//     );
//   }
// }

export default RepositoryList;
