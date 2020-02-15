const { gql } = require('apollo-server'),
  { UserController } = require('../controllers'),
  { catchedErr } = require('../helpers'),
  { checkSignin, getFilter, signup, checkingPin, updatePin, signin, forgotPassword, confirmCode, changePassword, uploadProfile, allEmployee } = UserController;
  
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
      gender: String,
      pin_security: Int
    }

    type PackageUser {
      user: User,
      token: String
    }

    type CheckPin {
      status: String,
      message: String
    }

    type MsgUser {
      msg: String
    }

    extend type Query {
      checkSignin ( code: String, token: String ): User,
      seeEmployee ( code: String, token: String ): [ User ]
    }

    extend type Mutation {
      signup ( code: String, username: String, password: String, email: String, role: String ): User,
      signin ( code: String, request: String, password: String ): PackageUser,
      forgot ( code: String, email: String ): MsgUser,
      filterEmployee ( code: String, token: String, search: String ): [ User ],
      confirm ( code: String, newPass: String, secretCode: String ): User,
      changePass ( code: String, newPass: String, token: String, oldPass: String ): MsgUser,
      updateProfile ( code: String, token: String, image: String ): User,
      changePin ( code: String, token: String, new_pin: String, old_ping: String ): User,
      checkPin ( code: String, token: String ): CheckPin
    }
  `,
  resolveUser: {
    Query: {
      checkSignin: async ( _, { code, token } ) => {
        try { return await checkSignin({ code, token }) }
        catch(err) { catchedErr( err ) }
      },
      seeEmployee: async ( _, { code, token } ) => {
        try { return await allEmployee({ code, token }) }
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
      filterEmployee: async ( _, { code, token, search } ) => {
        try { return await getFilter({ code, token, search }) }
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
      },
      changePin: async ( _, { code, token, old_pin, new_pin }) => {
        try { return await updatePin({ code, token, old_pin, new_pin }) }
        catch(err) { catchedErr( err ) }
      },
      checkPin: async (_, { code, token, pin_security }) => {
        try { return await checkingPin({ code, token, pin_security }) }
        catch(err) { catchedErr( err ) }
      }
    }
  }
}