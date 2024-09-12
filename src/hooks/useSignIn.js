import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { useContext } from "react";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { redirect, useNavigate } from "react-router-native";
const useSignIn = () => {
  const [mutate] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const signIn = async ({ username, password }) => {
    const result = await mutate({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken(result.data.authenticate.accessToken);
    apolloClient.resetStore();

    return result;
  };

  return {
    signIn,
  };
};
export default useSignIn;
