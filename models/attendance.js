const { gql } = require('apollo-server'),
  { AttendanceController } = require('../controllers'),
  { catchedErr } = require('../helpers'),
  { createStart, attUser, updateEnd, updateLocation, createOflineStart, updateOfflineEndAtt, findFilter, checkAtt, deleteCauseFail, getDailyHistory, revisiLoc, history, findAttId } = AttendanceController

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
      start_reason: String,
      end: String,
      end_image: String,
      end_issues: String,
      end_location: LocationAtt,
      end_reason: String,
      createdAt: String,
      updatedAt: String,
      date: String
    }
    
    type MsgAtt {
      msg: String
    }

    extend type Query {
      userAtt ( code: String, token: String ): Attendance,
      dailyUser ( code: String, token: String ): MsgAtt,
      getHistory ( code: String, token: String ): [ Attendance ],
      findAttId ( code: String, token: String, id: String ): Attendance,
      filter ( code: String, token: String, category: String, search: String ): [Attendance],
      check ( code: String, token: String, id: String ): MsgAtt
    }

    extend type Mutation {
      createAtt ( code: String, token: String, start_image: String, start_reason: String ): Attendance,
      createOffline ( code: String, token: String, start_image: String, start_reason: String, clock: String ): Attendance,
      updateAtt ( code: String, token: String, id: String, end_image: String, end: String ): Attendance,
      updateOffline ( code: String, token: String, id: String, clock: String, end_image: String ): Attendance,
      locUpdate ( code: String, token: String, os: String, type: String, id: String, latitude: String, longitude: String, accuracy: String, reason: String ): Attendance,
      failProcess ( code: String, token: String, id: String ): MsgAtt,
      revisiLocation ( code: String, token: String, os: String, type: String, id: String, latitude: String, longitude: String, accuracy: String ): Attendance,
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
      },
      getHistory: async ( _,{ code, token } ) => {
        try { return await history({ code, token }) }
        catch(err) { catchedErr( err ) }
      },
      findAttId: async ( _,{ code, token, id }) => {
        try { return await findAttId({ code, token, id }) }
        catch(err) { catchedErr( err ) }
      },
      filter: async ( _,{ code, token, category, search }) => {
        try { return await findFilter({ code, token, category, search }) }
        catch(err) { catchedErr( err ) }
      },
      check: async ( _,{ code, token, id }) => {
        try { return await checkAtt({ code, token, id }) }
        catch(err) { catchedErr( err ) }
      }
    },
    Mutation: {
      createOffline: async ( _,{ code, token, start_image, start_reason, clock }) => {
        try { return await createOflineStart({ code, token, start_image, start_reason, clock }) }
        catch(err) { catchedErr( err ) }
      },
      createAtt: async ( _, { code, token, start_image, start_reason } ) => {
        try { return await createStart({ code, token, start_image, start_reason }) }
        catch(err) { catchedErr( err ) }
      },
      updateAtt: async ( _, { code, token, id, end_image, end } ) => {
        try { return await updateEnd({ code, token, id, end_image, end }) }
        catch(err) { catchedErr( err ) }
      },
      updateOffline: async ( _, { code, token, id, end_image, clock }) => {
        try{ return await updateOfflineEndAtt({ code, token, id, end_image, clock }) }
        catch(err) { catchedErr( err ) }
      },
      locUpdate: async ( _, { code, token, os, type, id, latitude, longitude, accuracy, reason } ) => {
        try { return await updateLocation({ code, token, os, type, id , latitude, longitude, accuracy, reason }) }
        catch(err) { catchedErr( err ) }
      },
      failProcess: async ( _, { code, token, id } ) => {
        try { return await deleteCauseFail({ code, token, id }) }
        catch(err) { catchedErr( err ) }
      },
      revisiLocation: async ( _, { code, token, os, type, id, latitude, longitude, accuracy } ) => {
        try { return await revisiLoc({ code, token, os, type, id, latitude, longitude, accuracy }) }
        catch(err) { catchedErr( err ) }
      },
    }
  }
}