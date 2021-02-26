import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, concat } from "@apollo/client";
// import { gql } from '@apollo/client'

import { ApolloProvider } from "@apollo/client";

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiI2MDIyNzJlNDgzNmIxOTVjYTBiMWRjYmMiLCJpYXQiOjE2MTQxMTYxODAsImV4cCI6MTYxNDIwMjU4MH0.lZax45aHO6n7ZMc2fyFgbhZJQLQzFlND3Bxxgwlq_II",
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, new HttpLink({ uri: "http://localhost:4000/graphql" })),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals();
