const { chooseShot } = require('../apis');

var base = '/users';

module.exports = {
  checkSignin: async ({ code, token }) => {
    const { data: { user } } = await chooseShot(code)({ method: 'get', url: `${ base }`, headers: { token } });
    return user;
  },
  getFilter: async ({ code, token, search }) => {
    const { data: { user } } = await chooseShot(code)({ method: 'post', url: `${base}/find`, headers: { token }, data: { search } });
    return user;
  },
  signin: async ({ code, request, password }) => {
    const { data } = await chooseShot(code)({ method: 'post', url: `${ base }/signin`, data: { request, password } });
    return data;
  },
  signup: async ({ code, token, username, password, email, role, phone, religion, gender }) => {
    const { data: { user } } = await chooseShot(code)({ method: 'post', url: `${ base }/signup`, headers: { token }, data: { username, email, role, password, phone, religion, gender } });
    return user;
  },
  forgotPassword: async ({ code, email }) => {
    const { data } = await chooseShot(code)({ method: 'post', url: `${ base }/forgot`, data: { email } });
    return data;
  },
  confirmCode: async ({ code, newPass, secretCode }) => {
    const { data: { user } } = await chooseShot(code)({ method: 'post', url: `${ base }/forgot/confirm`, data: { secretCode, newPass } });
    return user
  },
  changePassword: async ({ code, newPass, oldPass, token }) => {
    const { data } = await chooseShot(code)({ method: 'post', url: `${ base }/change`, data: { newPass, oldPass }, headers: { token } });
    return data;
  },
  uploadProfile: async ({ code, token, image }) => {
    const { data: { user } } = await chooseShot(code)({ method: 'post', url: `${ base }/upload`, data: { image }, headers: { token } });
    return user;
  },
  allEmployee: async ({ code, token }) => {
    const { data: { user } } = await chooseShot(code)({ method: 'get', url: `${ base }/employee`, headers: { token } });
    return user;
  },
  updatePin: async ({ code, token, new_pin, old_pin }) => {
    const { data: { user } } = await chooseShot(code)({ method: 'put', url: `${ base }/change/pin`, headers: { token }, data: { new_pin, old_pin } });
    return user;
  },
  checkingPin: async ({ code, token, pin_security }) => {
    const { data } = await chooseShot(code)({ method: 'post', url: `${ base }/check`, headers: { token }, data: { pin_security } });
    return data;
  }
}