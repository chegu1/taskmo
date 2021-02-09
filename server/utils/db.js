const mongoose = require('mongoose');

const dbConnection = mongoose.connect(
    process.env.DATABASE || `mongodb://localhost:27017/taskmo`,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(res => console.log("db connected successfully"))
    .catch(err => console.log(`db connection failed ${err}`))

module.exports = dbConnection;