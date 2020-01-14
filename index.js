const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server'),
  { User } = require('./models'),
  { typeUser, resolveUser } = User,
  

  typeDefs = gql`
  type Query
  type Mutation
`;


const server = new ApolloServer(
  { 
    schema: makeExecutableSchema({
      typeDefs: [ typeDefs, typeUser ],
      resolvers: [ resolveUser ]
    })
  }
)
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});