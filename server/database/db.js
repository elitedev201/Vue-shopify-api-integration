const sql = require("mssql")
const databaseConfig = require('./config')

sql.connect(databaseConfig)

module.exports = sql
