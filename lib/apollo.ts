// /lib/apollo.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// const httpLink = createHttpLink({
//   uri: "/api/graphql",
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

const apolloClient = new ApolloClient({
  // link: authLink.concat(httpLink),
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

export default apolloClient;
