import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Linking from "expo-linking";

import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { REPOSITORY } from "../../../graphql/queries";
import { Counts } from "../RepositoryItem/Counts";
import { BtnPrimary } from "../RepositoryItem/BtnPrimary";
import theme from "../../../theme";
import { styled } from "nativewind";
import { format } from "date-fns";
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    padding: 10,
    backgroundColor: "white",
    gap: 15,
  },
  ImageContainer: {
    display: "flex",
  },
  images: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
  },
  textsContainer: {
    flexGrow: 1,
    display: "flex",
    rowGap: 5,
  },

  countersContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  text: {
    fontWeight: theme.fontWeights.bold,
  },

  btn: {
    backgroundColor: theme.colors.primary,
    margin: 10,
    color: "white",
    borderRadius: 5,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
});

// const SingleRepoView = ({}) => {

// };
// export default SingleRepoView;

const RepositoryInfo = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
  url,
  ...props
}) => {
  return (
    <View
      style={styles.container}
      testID='repositoryItem'>
      <View style={styles.subContainer}>
        <View style={styles.ImageContainer}>
          <Image
            source={{ uri: ownerAvatarUrl }}
            style={styles.images}
          />
        </View>
        <View style={styles.textsContainer}>
          <Text style={styles.text}>{fullName}</Text>
          <Text>{description}</Text>
          <BtnPrimary btnTitle={language} />
        </View>
      </View>
      <View style={styles.countersContainer}>
        <Counts
          count={stargazersCount}
          name='Stars'
        />
        <Counts
          count={forksCount}
          name='Forks'
        />
        <Counts
          count={reviewCount}
          name='Reviews'
        />
        <Counts
          count={ratingAverage}
          name='Rating'
        />
      </View>
      <TouchableOpacity
        // style={styles.btn}
        className='bg-primary rounded-lg mx-2 px-3 py-2 h-12 items-center justify-center '
        onPress={() => {
          Linking.openURL(url);
        }}>
        <Text className='text-white text-center text-lg'>Open in Github</Text>
      </TouchableOpacity>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  console.log("aa", review);

  return (
    <View className='bg-white w-full flex-row p-3 '>
      <View className='flex flex-col justify-start'>
        <View
          className={` rounded-[50px] border-4 border-[#0366d6]  w-10 h-10 justify-center items-center`}>
          <Text className='text-center font-bold text-[#0366d6]'>
            {review.rating}
          </Text>
        </View>
      </View>
      <View className='ml-3 flex-1 space-y-1 '>
        <View>
          <Text className='font-bold'>{review.user.username}</Text>
          <Text>{format(review.createdAt, "MM/dd/yyyy")}</Text>
        </View>
        <View>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const id = useParams().id;
  console.log(id);
  const { data, loading, error } = useQuery(REPOSITORY, {
    variables: {
      id,
    },
  });
  if (loading) return <Text>Loading</Text>;

  if (error) return <Text>Error</Text>;

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
    />
  );
};

export default SingleRepository;
