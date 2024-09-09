import { BtnPrimary } from "./BtnPrimary";
import { Counts } from "./Counts";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
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
});
const Item = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
  opened = false,
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
    </View>
  );
};
export default Item;
