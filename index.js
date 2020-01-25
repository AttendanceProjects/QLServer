const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server'),
  { User, Attendance, Company } = require('./models'),
  { typeUser, resolveUser } = User,
  { typeAttendance, resolveAttendance } = Attendance,
  { typeCompany, resolveCompany } = Company
  

  typeDefs = gql`
    type Query
    type Mutation
  `


const server = new ApolloServer(
  { 
    schema: makeExecutableSchema({
      typeDefs: [ typeDefs, typeUser, typeAttendance, typeCompany ],
      resolvers: [ resolveUser, resolveAttendance, resolveCompany ]
    })
  }
)
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});