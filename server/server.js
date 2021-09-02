// server/server/js
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const sql = require("mssql")
const dotenvConf = require("dotenv").config()

app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(require("./routes"))

// config for your database
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
}


//connect to mssql
sql.connect(config)

// listen on the port
app.listen(process.env.PORT || 8000)
