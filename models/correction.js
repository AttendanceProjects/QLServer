const { gql } = require('apollo-server'),
  { CorrectionController } = require('../controllers'),
  { catchedErr } = require('../helpers'),
  {
    getUserCorrection,
    createACorrection,
    filterCorrection,
    responCorrection,
    seeReqIn,
    getOneCorrectionController
  } = CorrectionController

module.exports = {
  typeCorrection: gql`

    type LocationCorrection {
      latitude: String,
      longitude: String
    }
    type AttendanceCorrectionId {
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
      AttId: AttendanceCorrectionId,
      UserId: String,
      reason: String,
      image: String,
      start: String,
      start_time: String,
      end: String,
      end_time: String,
      status: String,
      createdAt: String,
      updatedAt: String
    }

    extend type Query {
      userCorrection ( code: String, token: String ) : [ Correction ],
      filterCorrection ( code: String, token: String, key: String ): [ Correction ],
      getOneCorrection ( code: Stirng, token: String, id: String ): Correction
    }

    extend type Mutation {
      reqIn ( code: String, token: String, pin_security: String ): [ Correction ]
      createCorrection ( code: String, token: String, reason: String, image: String, start_time: String, end_time: String, id: String ): MsgCorrection,
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
      },
      getOneCorrection: async ( _, { code, token, id }) => {
        try{ return await getOneCorrectionController({ code, token, id }) }
        catch(err) { catchedErr( err ) }
      }
    },
    Mutation: {
      createCorrection: async ( _, { code, token, reason, id, image, start_time, end_time }) => {
        try { return await createACorrection({ code, token, id, reason, image, start_time, end_time }) }
        catch(err) { catchedErr( err ) }
      },
      responseCorrection: async ( _, { code, token, id, res, pin_security }) => {
        try { return await responCorrection({ code, token, id, res, pin_security }) }
        catch(err) { catchedErr( err ) }
      },
      reqIn: async ( _, { code, token, pin_security } ) => {
        try { return await seeReqIn({ code, token, pin_security }) }
        catch(err) { catchedErr( err ) }
      }
    }
  }
}