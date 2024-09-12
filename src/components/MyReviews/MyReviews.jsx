import { View, Text, FlatList } from "react-native";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ME } from "../../graphql/queries";
import ReviewItem from "../RepositoryList/SingleRepoView/ReviewItem";
import ReviewRepos from "./ReviewRepo";
import { DELETE_REVIEW } from "../../graphql/mutations";

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: {
      withReviews: true,
    },
  });

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onCompleted: (data) => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Loading</Text>;

  console.log("rr", data);

  const reviewsNodes = data.me.reviews.edges.map(({ node }) => node);

  return (
    <View>
      <FlatList
        data={reviewsNodes}
        renderItem={({ item }) => (
          <ReviewRepos
            review={item}
            deleteReview={deleteReview}
            refetch={refetch}
          />
        )}
        ItemSeparatorComponent={() => <View className='h-2' />}
      />
    </View>
  );
};

export default MyReviews;
