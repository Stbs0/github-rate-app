import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import theme from "../theme";
import { Formik } from "formik";
import * as yup from "yup";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});
const validationSchema = yup.object().shape({
  username: yup.string().min(5, "to short").required("Username is required"),
  password: yup.string().min(2, "Too Short!").required("Password is required"),
});
const onSubmit = (values) => {
  console.log(values);
};
const SignIn = () => {
  // console.log(formik.errors.password)
  // console.log(formik.errors.username)
  // console.log(formik.values.username)
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validateOnChange
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({
        errors,
        touched,
        handleChange,
        handleSubmit,
        values,
        handleBlur,
      }) => (
        <View style={styles.container}>
          <TextInput
            placeholder='Username'
            style={
              errors.username && touched.username
                ? { ...styles.input, borderColor: "#d73a4a" }
                : styles.input
            }
            value={values.username}
            onBlur={handleBlur("username")}
            onChangeText={handleChange("username")}
          />
          {touched.username && errors.username && (
            <Text style={{ color: "#d73a4a" }}>{errors.username}</Text>
          )}
          <TextInput
            secureTextEntry
            placeholder='Password'
            onBlur={handleBlur("password")}
            style={
              errors.password && touched.password
                ? { ...styles.input, borderColor: "#d73a4a" }
                : styles.input
            }
            value={values.password}
            b
            onChangeText={handleChange("password")}
          />
          {touched.password && errors.password && (
            <Text style={{ color: "#d73a4a" }}>{errors.password}</Text>
          )}
          <Pressable
            style={styles.btn}
            onPress={handleSubmit}>
            <Text style={styles.text}>Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
