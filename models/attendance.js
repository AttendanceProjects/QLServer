const { gql } = require('apollo-server'),
  { AttendanceController } = require('../controllers'),
  { catchedErr } = require('../helpers'),
  { createStart, attUser, updateEnd, updateLocation, deleteCauseFail, getDailyHistory } = AttendanceController

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
    type LocationAtt {
      latitude: String,
      longitude: String
    }
    type Attendance {
      _id: String
      UserId: UserAtt,
      start: String,
      start_image: String,
      start_issues: String,
      start_location: LocationAtt,
      end: String,
      end_image: String,
      end_issues: String,
      end_location: LocationAtt,
      end_reason: String,
      date: String
    }
    type HistoryAtt {
      _id: String,
      AttendanceId: Attendance,
      date: String
    }
    type Image {
      url: String
    }

    type FormData {
      _parts: [[ String ]]
    }

    type MsgAtt {
      msg: String
    }

    extend type Query {
      userAtt ( code: String, token: String ): Attendance,
      dailyUser ( code: String, token: String ): MsgAtt
    }

    extend type Mutation {
      createAtt ( code: String, token: String, start_image: String ): Attendance,
      updateAtt ( code: String, token: String, id: String, end_image: String ): HistoryAtt,
      locUpdate ( code: String, token: String, os: String, type: String, id: String, latitude: String, longitude: String, accuracy: String, reason: String ): Attendance,
      failProcess ( code: String, token: String, id: String ): MsgAtt
    }
  `,
  resolveAttendance: {
    Query: {
      userAtt: async ( _, { code, token } ) => {
        try { return await attUser({ code, token }) }
        catch(err) { catchedErr( err ) }
      },
      dailyUser: async ( _, { code, token } ) => {
        try { return await getDailyHistory({ code, token }) }
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
      locUpdate: async ( _, { code, token, os, type, id, latitude, longitude, accuracy, reason } ) => {
        try { return await updateLocation({ code, token, os, type, id , latitude, longitude, accuracy, reason }) }
        catch(err) { catchedErr( err ) }
      },
      failProcess: async ( _, { code, token, id } ) => {
        try { return await deleteCauseFail({ code, token, id }) }
        catch(err) { catchedErr( err ) }
      }
    }
  }
}