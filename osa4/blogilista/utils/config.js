require('dotenv').config()

let PORT = process.env.PORT
let MONGODBURI = process.env.MONGOURI

if(process.env.NODE_ENV === 'test'){
    MONGODBURI = process.env.TEST_MONGOURI
}

module.exports = {
    PORT,
    MONGODBURI
}