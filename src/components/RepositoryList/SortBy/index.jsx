import { View, Text } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
const SortBy = ({ sortBy, setSortBy }) => {
  return (
    <View>
      <Picker
      prompt="select a sort by"
    //   style={{color:"gray"}}
        selectedValue={sortBy}
        onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}>
        <Picker.Item
          label='Latest repositories'
          value='latest'
        />
        <Picker.Item
          label='Highest rated repositories'
          value='highest'
        />
        <Picker.Item
          label='Lowest rated repositories'
          value='lowest'
        />
      </Picker>
    </View>
  );
};

export default SortBy;
