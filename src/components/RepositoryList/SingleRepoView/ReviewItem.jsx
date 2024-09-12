import { format } from "date-fns";
import { Text, View } from "react-native";

const ReviewItem = ({ review ,...props }) => {
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
          <Text className='font-bold'>{review.user.username ? review.user.username : props}</Text>
          <Text>{format(review.createdAt, "MM/dd/yyyy")}</Text>
        </View>
        <View>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};
export default ReviewItem;