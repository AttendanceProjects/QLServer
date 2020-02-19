const { chooseShot } = require('../apis'),
  base = '/correction';

module.exports = {
  getUserCorrection: async ({ code, token }) => {
    const { data: { correction } } = await chooseShot(code)({ method: 'get', url: base, headers: { token } });
    return correction;
  },
  filterCorrection: async ({ code, token, key }) => {
    const { data: { correction } } = await chooseShot(code)({ method: 'get', url: `${base}/search?key=${ key }`, headers: { token } });
    return correction;
  },
  createACorrection: async ({ code, token, id, reason, image, start_time, end_time }) => {
    const { data } = await chooseShot(code)({ method: 'post', url: `${ base }`, headers: { token }, data: { reason, image, start_time, end_time, id } });
    return data;
  },
  responCorrection: async ({ code, token, id, res, pin_security }) => {
    const { data: { msg } } = await chooseShot(code)({ method: 'patch', url: `${base}/${id}/${res}`, headers: { token }, data: { pin_security } });
    return msg;
  },
  seeReqIn: async ({ code, token, pin_security }) => {
    const { data: { correction } } = await chooseShot(code)({ method: 'post', url: `${base}/inreq`, headers: { token }, data: { pin_security } });
    return correction;
  },
  getOneCorrectionController: async ({ code, token, id }) => {
    const { data: { correction } } = await chooseShot(code)({ method: 'get', url: `${ base }/${ id }`, headers: { token } });
    return correction
  }
}