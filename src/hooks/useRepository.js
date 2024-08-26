import { useQuery } from "@apollo/client";
import { ALL_REPOSITORIES_ITEMS } from "../graphql/queries";

const useRepositories = () => {
  const { data, loading, error } = useQuery(ALL_REPOSITORIES_ITEMS, {
    fetchPolicy: "cache-and-network",
  });

  // Provide a default value

  return { data, loading, error };
};

export default useRepositories;
