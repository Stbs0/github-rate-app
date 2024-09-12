import { View, Text, TextInput } from "react-native";
import React from "react";

const FieldInput = ({
  errors,
  touched,
  handleChange,
  values,
  handleBlur,
  placeholder,
  
  name,secret,
  ...props
}) => {
  return (
    <View className=' mb-3 '>
      <TextInput
        autoCapitalize="none"
        value={values}
        secureTextEntry={secret}
        onBlur={handleBlur(name)}
        onChangeText={handleChange(name)}
        placeholder={placeholder}
       {...props}
        className={`border-2 border-gray-500 rounded-md px-2 py-1 ${
          errors && touched ? "border-red-500" : ""
        }`}
      />
      {errors && touched ? (
        <Text className='text-red-500'>{errors}</Text>
      ) : null}
    </View>
  );
};

export default FieldInput;
