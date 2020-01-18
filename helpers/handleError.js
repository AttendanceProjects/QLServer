module.exports = {
  catchedErr: ( err ) => {
    if( err.msg ) throw new Error( err.msg );
    else throw new Error( err.response.data.msg );
  }
}