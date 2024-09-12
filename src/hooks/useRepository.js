import { useQuery } from "@apollo/client";
import { ALL_REPOSITORIES_ITEMS } from "../graphql/queries";

const useRepositories = (variables) => {
  
  switch (variables.sortBy) {
    case "latest":
      variables.sort = { orderBy: "CREATED_AT", orderDirection: "DESC" };
      break;
    case "highest":
      variables.sort = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      break;
    case "lowest":
      variables.sort = { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      break;
    default:
      variables.sort = { orderBy: "CREATED_AT", orderDirection: "DESC" };
  }

  const { data, loading, error, fetchMore, ...result } = useQuery(
    ALL_REPOSITORIES_ITEMS,
    {
      fetchPolicy: "cache-and-network",
      variables
    },
  );
 
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;

