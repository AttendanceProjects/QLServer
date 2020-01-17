const { gql } = require('apollo-server'),
  { UserController } = require('../controllers'),
  { checkSignin, getApproval, signup, signin, forgotPassword, confirmCode, changePassword } = UserController;

module.exports = {
  typeUser: gql`
    type User {
      _id: String,
      username: String,
      password: String,
      email: String,
      role: String
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
      changePass ( code: String, newPass: String, token: String ): User
    }
  `,
  resolveUser: {
    Query: {
      checkSignin: async ( _, args ) => {
        const { code, token } = args;
        try { return await checkSignin({ code, token }) }
        catch(err) {
          if( err.msg ) throw new Error( err.msg );
          else throw new Error( err.response.data.msg );
        }
      },
      approval: async ( _, args ) => {
        try { return await getApproval( args.code ) }
        catch(err) {
          if( err.msg ) throw new Error( err.msg );
          else throw new Error( err.response.data.msg );
        }
      }
    },
    Mutation: {
      signup: async ( _, args ) => {
        const { code, username, email, role, password } = args;
        try { return await signup({ code, username, email, role, password }) }
        catch(err) {
          if( err.msg ) throw new Error( err.msg );
          else throw new Error( err.response.data.msg );
        }
      },
      signin: async ( _, args ) => {
        const { code, request, password } = args;
        try { return await signin({ code, request, password }) }
        catch(err) {
          if( err.msg ) throw new Error( err.msg );
          else throw new Error( err.response.data.msg );
        }
      },
      forgot: async ( _, args ) => {
        const { code, email } = args;
        try { return await forgotPassword({ code, email }) }
        catch(err) { 
          if( err.msg ) throw new Error( err.msg );
          else throw new Error( err.response.data.msg );
        }
      },
      confirm: async ( _, args ) => {
        const { code, newPass, secretCode } = args;
        try { return await confirmCode({ code, newPass, secretCode }) }
        catch(err) {
          if( err.msg ) throw new Error( err.msg );
          else throw new Error( err.response.data.msg );
        }
      },
      changePass: async ( _, args ) => {
        const { code, newPass, token } = args;
        try { return await changePassword({ code, newPass, token }) }
        catch(err) {
          if( err.msg ) throw new Error( err.msg );
          else throw new Error( err.response.data.msg );
        } 
      }
    }
  }
}