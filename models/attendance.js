const { gql } = require('apollo-server'),
  { AttendanceController } = require('../controllers'),
  { catchedErr } = require('../helpers'),
  { createStart, attUser, updateEnd } = AttendanceController

module.exports = {
  typeAttendance: gql`
    type UserAtt {
      _id: String,
      username: String,
      password: String,
      profile_image: String,
      email: String,
      role: String,
    }
    type Attendance {
      _id: String
      UserId: UserAtt,
      start: String,
      start_image: String,
      end: String,
      end_image: String,
      date: String
    }
    type HistoryAtt {
      _id: String
      AttendanceId: String,
      UserId: String,
      date: String
    }
    type Image {
      url: String
    }

    type FormData {
      _parts: [[ String ]]
    }

    type PackageAttendance {
      attendance: Attendance,
      history: HistoryAtt
    }

    extend type Query {
      userAtt ( code: String, token: String ): Attendance
    }

    extend type Mutation {
      createAtt ( code: String, token: String, start_image: String ): Attendance,
      updateAtt ( code: String, token: String, id: String ): PackageAttendance
    }
  `,
  resolveAttendance: {
    Query: {
      userAtt: async ( _, { code, token } ) => {
        try { return await attUser({ code, token }) }
        catch(err) { catchedErr( err ) }
      }
    },
    Mutation: {
      createAtt: async ( _, { code, token, start_image } ) => {
        try { return await createStart({ code, token, start_image }) }
        catch(err) { catchedErr( err ) }
      },
      updateAtt: async ( _, { code, token, id } ) => {
        try { return await updateEnd({ code, token, id }) }
        catch(err) { catchedErr( err ) }
      }
    }
  }
}