const { gql } = require('apollo-server'),
  { catchedErr } = require('../helpers'),
  { HistoryController } = require('../controllers'),
  { getUserHistory } = HistoryController

module.exports = {
  typeHistory: gql`
    type UserHistory {
      _id: String,
      username: String,
      password: String,
      profile_image: String,
      email: String,
      role: String
    }

    type LocationHistory {
      latitude: String,
      longitude: String
    }

    type AttendanceHistory {
      _id: String,
      UserId: UserHistory,
      start: String,
      start_image: String,
      start_issues: String,
      start_location: LocationHistory,
      end: String,
      end_image: String,
      end_issues: String,
      end_location: LocationHistory,
      end_reason: String,
      date: String
    }
    type History {
      AttendanceId: AttendanceHistory,
      createdAt: String,
      UserId: String
    }

    extend type Query {
      getHistory ( code: String, token: String ): [ History ]
    }
  `,
  resolveHistory: {
    Query: {
      getHistory: async ( _, { code, token } ) => {
        try { return await getUserHistory({ code, token }) }
        catch(err) { catchedErr( err ) }
      }
    }
  }
}