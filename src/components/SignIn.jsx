import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import theme from "../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import AuthStorage from "../utils/authStorage";
import useLogOut from "../hooks/useLogOut";
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

const SignIn = () => {
  const { signIn } = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data.authenticate.accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export const SignInContainer = ({ onSubmit }) => {
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
            <Text style={styles.text}>Submit</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};
export default SignIn;
