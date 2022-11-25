require('dotenv').config()

const MONGODB_URI_WITH_PWD = process.env.MONGODB_URI_WITH_PWD;
const PORT = process.env.PORT

module.exports = {MONGODB_URI_WITH_PWD, PORT}