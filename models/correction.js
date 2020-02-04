const { gql } = require('apollo-server'),
  { CorrectionController } = require('../controllers'),
  { catchedErr } = require('../helpers'),
  {
    getUserCorrection,
    createACorrection,
    filterCorrection,
    responCorrection
  } = CorrectionController

module.exports = {
  typeCorrection: gql`

    type LocationCorrection {
      latitude: String,
      longitude: String
    }
    type AttendanceId {
      _id: String,
      UserId: String,
      start: String,
      start_image: String,
      start_issues: String,
      start_location: LocationCorrection,
      start_reason: String,
      end: String,
      end_image: String,
      end_issues: String,
      end_location: LocationCorrection,
      end_reason: String,
      date: String
    }
    

    type MsgCorrection {
      msg: String
    }

    type Correction {
      _id: String,
      AttId: AttendanceId,
      UserId: String,
      reason: String,
      image: String,
      start: String,
      end: String,
      status: String,
      createdAt: String,
      updatedAt: String
    }

    extend type Query {
      userCorrection ( code: String, token: String ) : Correction,
      filterCorrection ( code: String, token: String, key: String ): Correction
    }

    extend type Mutation {
      createCorrection ( code: String, token: String, reason: String, image: String ): MsgCorrection,
      responseCorrection ( code: String, token: String, res: String, id: String ): Correction 
    }
  `,
  resolveCorrection: {
    Query: {
      userCorrection: async ( _, { code, token }) => {
        try { return await getUserCorrection({ code, token }) }
        catch(err) { catchedErr( err ) }
      },
      filterCorrection: async ( _, { code, token, key }) => {
        try { return await filterCorrection({ code, token, key }) }
        catch(err) { catchedErr( err ) }
      }
    },
    Mutation: {
      createCorrection: async ( _, { code, token, reason, image }) => {
        try { return await createACorrection({ code, token, reason, image }) }
        catch(err) { catchedErr( err ) }
      },
      responseCorrection: async ( _, { code, token, id, res }) => {
        try { return await responCorrection({ code, token, id, res }) }
        catch(err) { catchedErr( err ) }
      }
    }
  }
}