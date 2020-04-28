// module imports
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')

// local imports
const { connectToDB } = require('./database')
const BaseRoute = require('./routes')


const app = express()


const port = process.env.PORT || 3000
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(helmet())
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/v1', BaseRoute)
app.listen(port, () => {
    connectToDB()
    console.log(`Example app listening on port port!`)
})

module.exports = { app }