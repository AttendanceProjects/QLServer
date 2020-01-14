module.exports = {
  chooseShot( code ) {
    if( code === '0001' ) return require('./PtLimDigitalAsia');
    else throw({ msg: 'Code Company Invalid' })
  }
}