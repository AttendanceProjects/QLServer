const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server'),
  { User,Attendance } = require('./models'),
  { typeUser, resolveUser } = User,
  { typeAttendance, resolveAttendance } = Attendance,
  

  typeDefs = gql`
    type Query
    type Mutation
  `


const server = new ApolloServer(
  { 
    schema: makeExecutableSchema({
      typeDefs: [ typeDefs, typeUser, typeAttendance ],
      resolvers: [ resolveUser, resolveAttendance ]
    })
  }
)
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});