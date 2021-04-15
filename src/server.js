const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express().use(express.json())
const PORT = process.env.PORT || 3031

/**
 * Database connections options
 */
require('./config/database')

/**
 * @Log every request to the console
 */
app.use(morgan('dev'))

/**
 * @Route path for webhook endpoint
 */
app.use(require('./routes/webhook'))

/**
 * @Route path for http endpoint
 */
app.use(require('./routes/http-endpoints'))

/**
 * @Listen incoming connections on PORT
 */
app.listen(PORT, console.log(`RUNNING ON PORT:${PORT}`))
