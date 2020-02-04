const { gql } = require('apollo-server'),
  { CompanyController } = require('../controllers'),
  { catchedErr } = require('../helpers'),
  { getCompany } = CompanyController

module.exports = {
  typeCompany: gql`
    type LocationCompany {
      longitude: String,
      latitude: String
    }

    type EmployeeCompany {
      _id: String,
      username: String,
      password: String,
      profile_image: String,
      email: String,
      role: String
    }


    type Company {
      _id: String,
      company_name: String,
      location: LocationCompany,
      start: String,
      end: String,
      Employee: [ EmployeeCompany ]
    }

    extend type Query {
      getCompany ( code: String, token: String ): Company
    }
  `,
  resolveCompany: {
    Query: {
      getCompany: async ( _, { code, token } ) => {
        try { return await getCompany({ code, token }) }
        catch(err) { catchedErr( err ) }
      }
    }
  }
}