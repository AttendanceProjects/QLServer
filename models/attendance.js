const { gql } = require('apollo-server'),
  { AttendanceController } = require('../controllers'),
  { catchedErr } = require('../helpers'),
  { createStart, attUser, updateEnd, updateTruth } = AttendanceController

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
      start_issues: String,
      end: String,
      end_image: String,
      end_issues: String,
      date: String
    }
    type HistoryAtt {
      _id: String
      AttendanceId: Attendance,
      date: String
    }
    type Image {
      url: String
    }

    type FormData {
      _parts: [[ String ]]
    }

    extend type Query {
      userAtt ( code: String, token: String ): Attendance
    }

    extend type Mutation {
      createAtt ( code: String, token: String, start_image: String ): Attendance,
      updateAtt ( code: String, token: String, id: String, end_image: String ): HistoryAtt,
      updateTruth ( code: String, token: String, type: String, issues: String, id: String ): Attendance
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
      updateAtt: async ( _, { code, token, id, end_image } ) => {
        try { return await updateEnd({ code, token, id, end_image }) }
        catch(err) { catchedErr( err ) }
      },
      updateTruth: async (_,{ code, token, issues, type, id }) => {
        try { return await updateTruth({ code, token, id, issues, type }) }
        catch(err) { catchedErr( err ) }
      }
    }
  }
}