import { format } from "date-fns";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useNavigate } from "react-router-native";

const ReviewRepos = ({ review, deleteReview, refetch }) => {
  const navigate = useNavigate();
  const deleteConformation = () =>
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Delete",
          onPress: async () => {
            await deleteReview({
              variables: {
                deleteReviewId: review.id,
              },
            });
            
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );

  console.log("aa", review);

  return (
    <View className='bg-white w-full space-y-4 p-3 '>
      <View className='flex-row '>
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
            <Text className='font-bold'>
              {review.repository.ownerName}/{review.repository.name}
            </Text>
            <Text>{format(review.createdAt, "MM/dd/yyyy")}</Text>
          </View>
          <View>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
      <View className='flex-row justify-around'>
        <TouchableOpacity
          className='bg-primary rounded-md p-4 '
          onPress={() => navigate(`/${review.repositoryId}`)}>
          <Text className='text-white text-center'>View Repository</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='bg-red-500 rounded-md p-4'
          onPress={deleteConformation}>
          <Text className='text-white text-center'>Delete Repository</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ReviewRepos;
