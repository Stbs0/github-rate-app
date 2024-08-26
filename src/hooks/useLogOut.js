import { useApolloClient, useQuery } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { ME } from "../graphql/queries";

const useLogOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const { data, loading } = useQuery(ME);

 const logOut = async () => {
   try {
     console.log("logging out");
     await authStorage.removeAccessToken();
     await apolloClient.resetStore();
   } catch (error) {
     console.error("Logout failed:", error);
   }
 };

  const isSignedIn = () => !!data.me;
  return { logOut, isSignedIn, data };
};

export default useLogOut;
