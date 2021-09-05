import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../config/theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/apollo";
import React, { VFC } from "react";
import AuthContext from "../context/AuthContext";

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <AuthContext>
          <Component {...pageProps} />
        </AuthContext>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
