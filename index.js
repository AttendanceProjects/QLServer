const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server'),
  {
    User: { typeUser, resolveUser },
    Attendance: { typeAttendance, resolveAttendance },
    Company: { typeCompany, resolveCompany },
    Correction: { typeCorrection, resolveCorrection },
    Token: { typeToken, resolveToken }
  } = require('./models'),
  

  typeDefs = gql`
    type Query
    type Mutation
  `


const server = new ApolloServer(
  { 
    schema: makeExecutableSchema({
      typeDefs: [ typeDefs, typeUser, typeAttendance, typeCompany, typeCorrection, typeToken ],
      resolvers: [ resolveUser, resolveAttendance, resolveCompany, resolveCorrection, resolveToken]
    })
  }
)
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});