const mongoose = require('mongoose')
const DB_HOST = process.env.DB_HOST

mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log("CONNECTED TO DATABASE")
}).catch(err => {
    console.error(err)
})