require('dotenv').config()

let PORT = process.env.PORT
let MONGODBURI = process.env.MONGOURI
let SECRET = process.env.KEY

if(process.env.NODE_ENV === 'test'){
    MONGODBURI = process.env.TEST_MONGOURI
}

module.exports = {
    PORT,
    MONGODBURI,
    SECRET
}