// server/server/js
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const port = 8000
const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa")
const sql = require("mssql")

app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Set up Auth0 configuration
const authConfig = {
  domain: "eclectico.us.auth0.com",
  audience: "https://tacomaconsignment.com",
}

// config for your database
const config = {
  user: "sa",
  password: "root",
  server: "localhost",
  database: "2021-08-28-tconsigndb",
}

// Create middleware to validate the JWT using express-jwt
const checkJwt = jwt({
  // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  // Validate the audience (Identifier) and the issuer (Domain).
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
})

app.get("/", (req, res) => {
  res.send(`Hi! Server is listening on port ${port}`)
})

// app.get("/products", checkJwt, (req, res) => {
//   res.send(data)
// })

app.get("/products", (req, res) => {
  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err)

    // create Request object
    var request = new sql.Request()

    // query to the database and get the records
    request.query("select * from products", function (err, recordset) {
      if (err) console.log(err)

      // send records as a response
      res.send(recordset)
    })
  })
})

// listen on the port
app.listen(port)
