import { FlatList, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";

import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { REPOSITORY } from "../../../graphql/queries";

import theme from "../../../theme";

import ReviewItem from "./ReviewItem";
import RepositoryInfo from "./RespositoryInfo";

const SingleRepository = () => {
  const id = useParams().id;
  console.log(id);
  const { data, loading, error, fetchMore } = useQuery(REPOSITORY, {
    variables: {
      id,
      first: 3,
    },
    fetchPolicy: "cache-and-network",
  });
  if (loading) return <Text>Loading</Text>;

  if (error) return <Text>Error</Text>;
  const onEndReach = () => {
    console.log(!data.repository.reviews.pageInfo.hasNextPage);
    console.log('aaaaa',data.repository.reviews.pageInfo);
    if (!data.repository.reviews.pageInfo.hasNextPage) return;

    fetchMore({
      variables: { after: data.repository.reviews.pageInfo.endCursor, id },
    });
  };

  const repository = data.repository;
  const reviews = repository.reviews.edges.map(({ node }) => node);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo {...repository} />}
      ItemSeparatorComponent={() => <View className='h-2' />}
      ListEmptyComponent={() => <Text>No reviews</Text>}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.1}
    />
  );
};

export default SingleRepository;
