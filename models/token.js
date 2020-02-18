const { gql } = require('apollo-server'),
  { TokenController: { makeToken, oneToken, allToken: allController } } = require('../controllers'),
  { catchedErr } = require('../helpers')

module.exports = {
  typeToken: gql`

    type UserToken {
      _id: String,
      username: String,
      password: String,
      profile_image: String,
      email: String,
      role: String,
      join: String,
      phone: String,
      identityNumber: Int,
      religion: String,
      gender: String,
      pin_security: Int
    }

    type Token {
      _id: String,
      createdAt: String,
      updatedAt: String,
      UserId: UserToken,
      token: String
    }

    extend type Query {
      allToken ( code: String, token: String ): Token,
      userToken ( code: String, token: String, id: String ): Token
    }

    extend type Mutation {
      createToken ( code: String, token: String, token_expo: String ): Token
    }
  `,
  resolveToken: {
    Query: {
      allToken: async ( _,{ code, token } ) => {
        try{ return await allController({ code, token }) }
        catch(err) { catchedErr( err ) }
      },
      userToken: async ( _,{ code, token, id }) => {
        try{ return await oneToken({ code, token, id }) }
        catch(err) { catchedErr( err ) }
      }
    },
    Mutation: {
      createToken: async ( _,{ code, token } ) => {
        try{ return await makeToken({ code, token }) }
        catch(err) { catchedErr( err ) }
      }
    }
  }
}