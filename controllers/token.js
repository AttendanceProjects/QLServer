const { chooseShot } = require( '../apis' ),
  base = '/token';

module.exports = {
  makeToken: async ({ code, token }) => {
    const { data: { token: tokenServer } } = await chooseShot(code)({ method: 'post', url: base, headers: { token } });
    return tokenServer;
  },
  allToken: async ({ code, token }) => {
    const { data: { token: tokenServer } } = await chooseShot(code)({ method: 'get', url: base, headers: { token } });
    return tokenServer;
  },
  oneToken: async ({ code, token, id }) => {
    const { data: { token: tokenServer } } = await chooseShot(code)({ method: 'get', url: `${ base }/${ id }`, headers: { token } });
    return tokenServer;
  }
}