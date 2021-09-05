import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { tokenManager } from "../utils/jwtManager";

const httpLink = createHttpLink({
  uri: `https://cloudtown-sandbox.hasura.app/v1/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const { token } = tokenManager.getToken();

  console.log(token);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
