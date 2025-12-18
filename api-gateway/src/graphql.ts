import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }
  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      // Burada user-service'den veri çekilebilir
      return [{ id: 1, username: 'testuser' }];
    },
  },
};

export const setupGraphQL = (app: any) => {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
  });
};
