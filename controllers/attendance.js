const { chooseShot } = require('../apis');

var base = '/attendance';

module.exports = {
  attUser: async ({ code, token }) => {
    const { data: { attendance } } = await chooseShot(code)({ method: 'get', url: base, headers: { token } });
    return attendance;
  },
  createStart: async ({ code, token, start_image, start_reason }) => {
    const { data: { attendance} } = await chooseShot(code)({ method: 'post', url: base, headers: { token }, data: { start_image, start_reason } });
    return attendance;
  },
  updateEnd: async ({ code, token, id, end_image }) => {
    const { data: { attendance } } = await chooseShot(code)({ method: 'patch', url: `${base}/${id}`, headers: { token }, data: { end_image } });
    return attendance;
  },
  updateLocation: async ({ code, token, os, type, id, longitude, latitude, accuracy, reason } ) => {
    const { data: { attendance } } = await chooseShot(code)({ method: 'patch', url: `${base}/location/${os}/${type}/${id}`, headers: { token }, data: { location: { latitude, longitude }, accuracy, reason } });
    return attendance;
  },
  deleteCauseFail: async ({ code, token, id }) => {
    const { data } = await chooseShot(code)({ method: 'delete', url: `${base}/fail/${ id }`, headers: { token } });
    return data.msg;
  },
  getDailyHistory: async ({ code, token }) => {
    const { data } = await chooseShot(code)({ method: 'get', url: `${base}/daily`, headers: { token } })
    return data;
  },
  revisiLoc: async ({ code, token, os, type, id, longitude, latitude, accuracy }) => {
    const { data: { attendance } } = await chooseShot(code)({ method: 'patch', url: `${base}/revisi/${os}/${type}/${id}`, headers: { token }, data: { location: { latitude, longitude }, accuracy }})
    return attendance;
  },
  history: async ({ code, token }) => {
    const { data: { attendance } } = await chooseShot(code)({ method: 'get', url: `${base}/history`, headers: { token } })
    return attendance;
  },
  findAttId: async ({ code, token, id }) => {
    const { data: { attendance } } = await chooseShot(code)({ method: 'get', url: `${base}/${id}`, headers: { token } })
    return attendance;
  },
  findFilter: async ({ code, token, category, search }) => {
    if( search ) {
      const { data: { attendance } } = await chooseShot(code)({ method: 'get', url: `${base}/search/by?category=${category}?search=${search}`, headers: { token } });
      return attendance;
    }else {
      const { data: { attendance } } = await chooseShot(code)({ method: 'get', url: `${base}/search/by?category=${category}`, headers: { token } });
      return attendance;
    }
  }
}
