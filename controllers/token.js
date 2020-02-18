const { chooseShot } = require( '../apis' ),
  base = '/token';

module.exports = {
  makeToken: async ({ code, token }) => {
    const { data: { token: tokenServer } } = await chooseShot(code)({ method: 'post', url: base, headers: { token } });
    return tokenServer;
  },
  pushAllUser: async ({ code, token, title, body }) => {
    const { data: { msg } } = await chooseShot(code)({ method: 'post', url: `${ base }/all`, headers: { token }, data: { title, body } });
    return msg;
  },
  pushOneUser: async ({ code, token, title, body, id }) => {
    const { data: { msg } } = await chooseShot(code)({ method: 'post', url: `${ base }/user/${ id }`, headers: { token }, data: { title, body } });
    return msg;
  }
}