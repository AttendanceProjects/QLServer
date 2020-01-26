const { chooseShot } = require('../apis');

var base = '/users';

module.exports = {
  checkSignin: async ({ code, token }) => {
    const { data } = await chooseShot(code)({ method: 'get', url: `${ base }`, headers: { token } });
    return data.user;
  },
  getApproval: async ( code ) => {
    const { data } = await chooseShot(code)({ method: 'get', url: `${ base }/approval` });
    return data.user;
  },
  signin: async ({ code, request, password }) => {
    const { data } = await chooseShot(code)({ method: 'post', url: `${ base }/signin`, data: { request, password } });
    return data;
  },
  signup: async ({ code, username, password, email, role, phone, identityNumber, religion, gender }) => {
    const { data } = await chooseShot(code)({ method: 'post', url: `${ base }/signup`, data: { username, email, role, password, phone, identityNumber, religion, gender } });
    return data.user;
  },
  forgotPassword: async ({ code, email }) => {
    const { data } = await chooseShot(code)({ method: 'post', url: `${ base }/forgot`, data: { email } });
    return data.msg;
  },
  confirmCode: async ({ code, newPass, secretCode }) => {
    const { data } = await chooseShot(code)({ method: 'post', url: `${ base }/forgot/confirm`, data: { secretCode, newPass } });
    return data.user
  },
  changePassword: async ({ code, newPass, oldPass, token }) => {
    const { data } = await chooseShot(code)({ method: 'post', url: `${ base }/change`, data: { newPass, oldPass }, headers: { token } });
    return data.user;
  }
}