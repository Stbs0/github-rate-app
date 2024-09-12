import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import FieldInput from "./FieldInput";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";

const reviewValidation = yup.object().shape({
  rating: yup
    .number()
    .required("required")
    .min(0, "to low")
    .max(100, "too high"),
  ownerName: yup.string().required("required"),
  repositoryName: yup.string().required("required"),
  text: yup.string().optional(),
});

const Review = () => {
  const navigate = useNavigate();
  const [createReview, { loading, error }] = useMutation(CREATE_REVIEW, {
    onCompleted: (data) => {
      console.log("data", data);
      console.log(data);
      navigate(`/${data.createReview.repositoryId}`);
    },
    onError: (error) => {
      Alert.alert("Error");
      console.log("Error creating review", error);
    },
  });
  console.log(loading, error);
  return (
    <Formik
      initialValues={{
        rating: "",
        text: "",
        repositoryName: "",
        ownerName: "",
      }}
      onSubmit={async (values) => {
        await createReview({
          variables: {
            review: { ...values, rating: Number(values.rating) },
          },
        });
      }}
      validateOnChange
      validationSchema={reviewValidation}>
      {({
        errors,
        touched,
        handleChange,

        values,
        handleSubmit,
        handleBlur,
      }) => (
        <View className='p-3 '>
          <FieldInput
            autoCapitalize='none'
            name={"ownerName"}
            touched={touched?.ownerName}
            errors={errors?.ownerName}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values.ownerName}
            placeholder={"Repository owner name"}
          />
          <FieldInput
            name={"repositoryName"}
            touched={touched?.repositoryName}
            errors={errors?.repositoryName}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values.repositoryName}
            placeholder={"Repository name"}
          />
          <FieldInput
            keyboardType='numeric'
            name={"rating"}
            touched={touched?.rating}
            errors={errors?.rating}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values.rating.toString()}
            placeholder={"Rating between 0 and 100"}
          />
          <FieldInput
            name={"text"}
            touched={touched?.text}
            errors={errors?.text}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values.text}
            multiline={true}
            placeholder={"Review"}
          />
          <TouchableOpacity
            className='bg-primary rounded-md p-2'
            onPress={handleSubmit}
            disabled={loading}
            testID='submitButton'>
            <Text className='text-white text-center'>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Review;
