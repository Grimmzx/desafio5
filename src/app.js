const express = require('express')
const morgan = require('morgan')
const joyasRoutes = require('./routes/joyasRoutes')
const cors = require('cors')
const errorMiddleware = require('./middlewares/errorMiddleware')
const {reportConsult} = require("./middlewares/reportMiddleware")
const app = express()

app.use(reportMiddleware)
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/', joyasRoutes)

app.use(errorMiddleware)
app.use(reportConsult)
app.use(morgan('dev'))


module.exports = app