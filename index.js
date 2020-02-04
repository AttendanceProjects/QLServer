const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server'),
  { User, Attendance, Company, Correction } = require('./models'),
  { typeUser, resolveUser } = User,
  { typeAttendance, resolveAttendance } = Attendance,
  { typeCompany, resolveCompany } = Company,
  { typeCorrection, resolveCorrection } = Correction
  

  typeDefs = gql`
    type Query
    type Mutation
  `


const server = new ApolloServer(
  { 
    schema: makeExecutableSchema({
      typeDefs: [ typeDefs, typeUser, typeAttendance, typeCompany, typeCorrection ],
      resolvers: [ resolveUser, resolveAttendance, resolveCompany, resolveCorrection]
    })
  }
)
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});