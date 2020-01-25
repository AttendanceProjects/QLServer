const { chooseShot } = require('../apis');

var base = '/company';

module.exports = {
  getCompany: async ({ code, token }) => {
    const { data } = await chooseShot(code)({ method: 'get', url: `${base}`, headers: { token } })
    return data.company;
  }
}