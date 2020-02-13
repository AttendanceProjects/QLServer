const { chooseShot } = require('../apis');

var base = '/company';

module.exports = {
  getCompany: async ({ code, token }) => {
    const { data: { company } } = await chooseShot(code)({ method: 'get', url: `${base}`, headers: { token } })
    return company;
  }
}