const { gql } = require('apollo-server'),
  { UserController } = require('../controllers'),
  { catchedErr } = require('../helpers'),
  { checkSignin, getApproval, signup, signin, forgotPassword, confirmCode, changePassword, uploadProfile } = UserController;
  
module.exports = {
  typeUser: gql`
    type User {
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
      gender: String
    }

    type PackageUser {
      user: User,
      token: String
    }

    type MsgUser {
      msg: String
    }

    extend type Query {
      checkSignin ( code: String, token: String ): User,
      approval ( code: String ): [ User ]
    }

    extend type Mutation {
      signup ( code: String, username: String, password: String, email: String, role: String ): User,
      signin ( code: String, request: String, password: String ): PackageUser,
      forgot ( code: String, email: String ): MsgUser,
      confirm ( code: String, newPass: String, secretCode: String ): User,
      changePass ( code: String, newPass: String, token: String, oldPass: String ): MsgUser,
      updateProfile ( code: String, token: String, image: String ): User
    }
  `,
  resolveUser: {
    Query: {
      checkSignin: async ( _, { code, token } ) => {
        try { return await checkSignin({ code, token }) }
        catch(err) { catchedErr( err ) }
      },
      approval: async ( _, { code } ) => {
        try { return await getApproval( code ) }
        catch(err) { catchedErr( err ) }
      }
    },
    Mutation: {
      signup: async ( _, { code, username, email, role, password, phone, identityNumber, religion, gender } ) => {
        try { return await signup({ code, username, email, role, password, phone, identityNumber, religion, gender }) }
        catch(err) { catchedErr( err ) }
      },
      signin: async ( _, { code, request, password } ) => {
        try { return await signin({ code, request, password }) }
        catch(err) { catchedErr( err ) }
      },
      forgot: async ( _, { code, email } ) => {
        try { return await forgotPassword({ code, email }) }
        catch(err) {  catchedErr( err ) }
      },
      confirm: async ( _, { code, newPass, secretCode } ) => {
        try { return await confirmCode({ code, newPass, secretCode }) }
        catch(err) { catchedErr( err ) }
      },
      changePass: async ( _, { code, newPass, token, oldPass } ) => {
        try { return await changePassword({ code, newPass, token, oldPass }) }
        catch(err) { catchedErr( err ) } 
      },
      updateProfile: async ( _, { code, token, image }) => {
        try { return await uploadProfile({ code, token, image })}
        catch(err) { catchedErr( err ) }
      }
    }
  }
}