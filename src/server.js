const express = require('express')
const app = express().use(express.json())
const PORT = process.env.PORT || 3031

/**
 * @Listen incoming connections on PORT
 */
app.listen(PORT, console.log(`RUNNING ON PORT:${PORT}`))
