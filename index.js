const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server'),
  { User, Attendance, History } = require('./models'),
  { typeUser, resolveUser } = User,
  { typeAttendance, resolveAttendance } = Attendance,
  { typeHistory, resolveHistory } = History
  

  typeDefs = gql`
    type Query
    type Mutation
  `


const server = new ApolloServer(
  { 
    schema: makeExecutableSchema({
      typeDefs: [ typeDefs, typeUser, typeAttendance, typeHistory ],
      resolvers: [ resolveUser, resolveAttendance, resolveHistory ]
    })
  }
)
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});