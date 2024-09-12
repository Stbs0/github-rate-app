import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BtnPrimary } from "../RepositoryItem/BtnPrimary";
import { Counts } from "../RepositoryItem/Counts";
import * as Linking from "expo-linking";
import theme from "../../../theme";
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
export default RepositoryInfo;
