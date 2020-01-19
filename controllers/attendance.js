const { chooseShot } = require('../apis');

var base = '/attendance';

module.exports = {
  attUser: async ({ code, token }) => {
    const { data } = await chooseShot(code)({ method: 'get', url: base, headers: { token } });
    return data.attendance;
  },
  createStart: async ({ code, token, start_image }) => {
    const { data } = await chooseShot(code)({ method: 'post', url: base, headers: { token }, data: { start_image } });
    return data.attendance;
  },
  updateEnd: async ({ code, token, id }) => {
    const { data } = await chooseShot(code)({ method: 'patch', url: `${base}/${id}`, headers: { token } });
    return data;
  }
}
