require('dotenv').config()

let PORT = process.env.PORT
let MONGODBURI = process.env.MONGOURI

module.exports = {
    PORT,
    MONGODBURI
}