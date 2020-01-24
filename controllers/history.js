const { chooseShot } = require('../apis');

var base = '/history'

module.exports = {
  getUserHistory: async ({ code, token }) => {
    const { data } = await chooseShot(code)({ method: 'get', url: `${ base }`, headers: { token } });
    return data.history
  }
}