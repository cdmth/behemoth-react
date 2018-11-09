import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('firebase-token')

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : ''
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:3001/api' })

const wsLink = new WebSocketLink({
  options: {
    reconnect: true
  },
  uri: `ws://localhost:3001/graphql`
});

/*const logoutLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) {
    localStorage.setItem('firebase-token', null)
  }
})*/

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)//.concat(logoutLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();