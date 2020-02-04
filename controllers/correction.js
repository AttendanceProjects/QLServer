const { chooseShot } = require('../apis'),
  base = '/correction';

module.exports = {
  getUserCorrection: async ({ code, token }) => {
    const { data } = await chooseShot(code)({ method: 'get', url: base, headers: { token } });
    return data.correction;
  },
  filterCorrection: async ({ code, token, key }) => {
    const { data } = await chooseShot(code)({ method: 'get', url: `${base}/search?key=${ key }`, headers: { token } });
    return data.correction;
  },
  createACorrection: async ({ code, token, reason, image }) => {
    const { data } = await chooseShot(code)({ method: 'post', url: base, headers: { token }, data: { reason, image } });
    return data.msg;
  },
  responCorrection: async ({ code, token, id, res }) => {
    const { data } = await chooseShot(code)({ method: 'patch', url: `${base}/${id}/${res}`, headers: { token } });
    return data.correction;
  },
  seeReqIn: async ({ code, token }) => {
    const { data } = await chooseShot(code)({ method: 'get', url: `${base}/inreq`, headers: { token } });
    return data.correction;
  }
}