import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { jwtManager } from "../utils/jwtManager";

const httpLink = createHttpLink({
  uri: `http://localhost:4000/graphql`
});

const authLink = setContext((_, { headers }) => {
  const token = jwtManager.getJwt()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
