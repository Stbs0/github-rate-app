import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import FieldInput from "./FieldInput";
import { CREATE_USER } from "../graphql/mutations";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";

const createUserSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required().trim(),
  password: yup.string().min(5).max(50).required().trim(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});
const SignUp = () => {
  const navigate = useNavigate();
  const { signIn } = useSignIn();
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: async (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("Error creating review", error);
    },
  });
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={async (values) => {
        console.log("s", values);
        const { data } = await createUser({
          variables: {
            user: { username: values.username, password: values.password },
          },
        });
        if (data) {
            console.log("🚀 ~ onSubmit={ ~ data:", data)
          await signIn({
            username: data.createUser.username,
            password: values.password
          });
        }

        navigate("/");
      }}
      validateOnChange
      validationSchema={createUserSchema}>
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
            name={"username"}
            touched={touched?.username}
            errors={errors?.username}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values.username}
            placeholder={"Username"}
          />
          <FieldInput
            name={"password"}
            touched={touched?.password}
            errors={errors?.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values.password}
            placeholder={"Password"}
            secret={true}
          />

          <FieldInput
            name={"confirmPassword"}
            touched={touched?.confirmPassword}
            errors={errors?.confirmPassword}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values.confirmPassword}
            placeholder={"Password confirmation"}
            secret={true}
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

export default SignUp;
