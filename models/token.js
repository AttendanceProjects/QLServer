const { gql } = require('apollo-server'),
  { TokenController: { makeToken, pushAllUser, pushOneUser } } = require('../controllers'),
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

    extend type Mutation {
      createToken ( code: String, token: String, token_expo: String ): Token,
      allUser ( code: String, token: String, title: String, body: String ): String,
      oneUser ( code: String, token: String, title: String, body: String, id: String ): String
    }
  `,
  resolveToken: {
    Mutation: {
      createToken: async ( _,{ code, token } ) => {
        try{ return await makeToken({ code, token }) }
        catch(err) { catchedErr( err ) }
      },
      allUser: async ( _,{ code, token, title, body } ) => {
        try{ return await pushAllUser({ code, token, title, body }) }
        catch(err) { catchedErr( err ) }
      },
      oneUser: async ( _,{ code, token, title, body, id } ) => {
        try{ return await pushOneUser({ code, token, title, body, id }) }
        catch(err) { catchedErr( err ) }
      }
    }
  }
}