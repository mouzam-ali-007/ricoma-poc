import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, concat } from '@apollo/client'
// import { gql } from '@apollo/client'

import { ApolloProvider } from '@apollo/client'

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiTWFyayIsImxhc3RuYW1lIjoiU3RlcGhhbiIsIm5pY2tuYW1lIjoiRU0iLCJlbWFpbCI6ImNvbnRhY3RAbWFya3N0ZXAuY29tIiwicm9sZSI6InVzZXIiLCJwYXNzd29yZCI6IiQyYSQxMCQxSFcuOC80TVFJVnFzOTBXLlFJby4uaTFsSUZkUExZd0kvak9pZFB3WFNpWWJ3Y2U4UWFFbSJ9.FTve_cuI3PZ_dIKNVK2ErQQA5tHV5t-vn5h0yb7alQg",
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, new HttpLink({ uri: 'http://localhost:4000/graphql' })),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
